import { get, ref, getDatabase } from "firebase/database";

export async function getFoldersinFolder(authId, folderId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            const folder = data.find(folder => folder && folder.id === folderId);

            if (folder && folder.folders) {
                // Create a duplicate of the folder to be moved with a new UUID

                console.log("Folder moved successfully");
                return folder.folders;
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

    return null;
}
