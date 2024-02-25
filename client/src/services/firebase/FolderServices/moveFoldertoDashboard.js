import { get, set, ref, getDatabase } from "firebase/database";
import { getTemplateFromFoldersRecursive } from "./getTemplateFromFolders";
import { deleteFolderFromFoldersRecursive } from "./moveFolderToFolder";

export async function moveFoldertoDashboard(authId, folderId) {
    const database = getDatabase();
    const folderDataRef = ref(database, `${authId}/folderData`);

    try {
        // Retrieve data snapshots in parallel
        const [folderSnapshot] = await Promise.all([
            get(folderDataRef),
        ]);

        // Check if the snapshot exists
        if (folderSnapshot.exists()) {
            const folderData = folderSnapshot.val();

            // Find the index of the source folder
            const folderIndex = folderData.findIndex(folder => folder.id === folderId);

            for (const folder of folderData) {
                let matchingTemplate;

                // Check if the template is not in the current folder, and search in nested folders
                if ((folderIndex === -1) && folder.folders) {
                    matchingTemplate = await getFolderinFoldersRecursive(folder.folders, folderId);
                }

                // Check if template is found
                if (folderIndex !== -1 || matchingTemplate) {
                    const folderToMove = (folderIndex !== -1) ? folderData[folderIndex] : matchingTemplate;

                    // Add the folder to the destination folder
                    folderData.push({ ...folderToMove });

                    // Update the folderData array

                    // Delete the folder from the source folder and nested folders
                    const response = await deleteFolderFromFoldersRecursive(folder.folders, folderToMove.id);

                    if (response) {
                        // Update the database with the modified data
                        await set(folderDataRef, folderData);

                        console.log("Folder Moved to Dashboard Successfully.");
                        return true;
                    }
                } else {
                    console.log("Source folder not found.");
                }
                break;
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
