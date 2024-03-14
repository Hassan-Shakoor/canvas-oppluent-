import { get, set, ref, getDatabase } from "firebase/database";
import { getFolderinFoldersRecursive } from "./createFolderinFolder";

export async function renameFolder(authId, folderId, newName) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const item of data) {
                if (item && item.id === folderId) {
                    const matchingFolder = item
                    if (matchingFolder) {
                        matchingFolder.name = newName;
                        
                        await set(databaseRef, data);
                        console.log("Data updated successfully");
                        return true;
                    }
                } else {
                    const folder = await getFolderinFoldersRecursive(item.folders, folderId)
                    if (folder) {
                        folder.name = newName;

                        await set(databaseRef, data);
                        console.log("Data updated successfully");
                        return true;
                    }
                }
            }
        } else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
