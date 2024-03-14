import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { getFolderinFoldersRecursive } from "./createFolderinFolder";

export async function duplicateFolder(authId, folderId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const folderData = snapshot.val();

            let folderToDuplicate = folderData.find(item => item && item.id === folderId);
            let parentFolder;

            if (!folderToDuplicate) {
                folderToDuplicate = await getFolderinFoldersRecursive(folderData, folderId);
                if (folderToDuplicate?.parentID) {
                    parentFolder = await getFolderinFoldersRecursive(folderData, folderToDuplicate?.parentID)
                }
            }

            if (folderToDuplicate) {
                // Generate new UUIDs for template IDs
                const duplicatedTemplates = folderToDuplicate?.template?.map(template => ({ ...template, id: uuidv4() }));

                // Create a duplicated folder with a new UUID
                const duplicatedFolder = { ...folderToDuplicate, id: uuidv4(), template: duplicatedTemplates || [] };

                // Add the duplicated folder to the data
                if (parentFolder) {
                    parentFolder?.folders?.push(duplicatedFolder)
                } else {
                    folderData.push(duplicatedFolder);
                }

                // Update the database with the modified data
                await set(databaseRef, folderData);

                console.log("Folder duplicated successfully");
                return true;
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
