import { get, set, ref, getDatabase } from "firebase/database";

export async function getFolders(authId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const folderData = snapshot.val();

            if (folderData) {
                console.log("Folders Retrieved Successfully.");
                return folderData;
            }

        } else {
            console.log("Folders does not exist");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
