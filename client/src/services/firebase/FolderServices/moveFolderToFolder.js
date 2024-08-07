import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

import { deleteTemplateFromFoldersRecursive } from "../TemplateServices/deleteTemplate";
import { getFolderinFoldersRecursive } from "./createFolderinFolder";

export async function moveFolderToFolder(authId, folderId, folderDestinationId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            let folderToMove;
            let folderDestination;

            folderToMove = data.find(folder => folder && folder.id === folderId);
            folderDestination = data.find(folder => folder && folder.id === folderDestinationId);

            if (!folderToMove || !folderDestination) {
                for (const folder of data) {
                    if (!folderToMove) {
                        folderToMove = await getFolderinFoldersRecursive(folder.folders, folderId)
                    }

                    if (!folderDestination) {
                        folderDestination = await getFolderinFoldersRecursive(folder.folders, folderDestinationId)
                    }
                }
            }

            if (folderToMove && folderDestination) {
                // Create a duplicate of the folder to be moved with a new UUID
                const duplicatedFolder = { ...folderToMove };

                if (!folderDestination.folders) {
                    folderDestination.folders = []
                }
                // Add the duplicated folder to the destination folder's template array


                const folderToRemoveIndex = data.findIndex(folder => folder && folder.id === folderToMove.id);
                if (typeof folderToRemoveIndex === 'undefined' || folderToRemoveIndex === -1) {
                    // if (!folderToRemoveIndex || folderToRemoveIndex === -1) {

                    const response = await deleteFolderFromFoldersRecursive(data, folderToMove.id)
                    if (response) {
                        folderDestination.folders.push(duplicatedFolder);
                        await set(databaseRef, data);
                        console.log("Folder moved successfully");
                        return true;
                    }

                } else {
                    const newData = data.filter(folder => folder.id !== folderId);
                    folderDestination.folders.push(duplicatedFolder);
                    await set(databaseRef, newData);
                    console.log("Folder moved successfully");
                    return true;
                }

                // Remove the original folder from the data array

                // Update the database with the modified data
            } else {
                console.log("Folder not found.");
            }
        } else {
            console.log("Data does not exist.");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }

    return false;
}

export const deleteFolderFromFoldersRecursive = async (folders, folderId) => {
    if (folders && folders.length > 0) {
        for (const folder of folders) {
            const folderIndex = folder?.folders?.findIndex(folder => folder.id === folderId);
            if (typeof folderIndex !== 'undefined' && (folderIndex !== -1 || folderIndex === 0)) {
                // Remove the template at the found index
                folder.folders?.splice(folderIndex, 1);
                return true;
            }

            if (folder.folders) {
                const recursiveMatch = await deleteFolderFromFoldersRecursive(folder.folders, folderId);
                if (recursiveMatch) {
                    return recursiveMatch;
                }
            }
        }
    }

    return false;
};