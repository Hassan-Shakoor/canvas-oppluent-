import { get, set, ref, getDatabase } from "firebase/database";
import { deleteFolderFromFoldersRecursive } from "./moveFolderToFolder";

export async function deleteFolder(authId, folderId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const data = snapshot.val();

            const folderIndex = data.findIndex(folder => folder.id === folderId)

            if (folderIndex !== -1) {
                data.splice(folderIndex, 1);
                await set(databaseRef, data);
                console.log("Template deleted successfully");
                return true;
            } else if (!folderIndex || folderIndex === -1) {
                const response = await deleteFolderFromFoldersRecursive(data, folderId)
                if (response) {
                    await set(databaseRef, data);
                    console.log("Template deleted successfully");
                    return true;
                }
            }

        }
        console.log("Matching template not found");

    } catch (error) {
        console.error('Error deleting template in Firebase:', error);
        throw error;
    }
    return false;
}
