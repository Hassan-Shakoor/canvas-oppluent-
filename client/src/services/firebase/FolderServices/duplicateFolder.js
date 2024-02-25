import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function duplicateFolder(authId, folderId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            const folderToDuplicate = data.find(item => item && item.id === folderId);

            if (folderToDuplicate) {
                // Generate new UUIDs for template IDs
                const duplicatedTemplates = folderToDuplicate.template.map(template => ({ ...template, id: uuidv4() }));

                // Create a duplicated folder with a new UUID
                const duplicatedFolder = { ...folderToDuplicate, id: uuidv4(), template: duplicatedTemplates };

                // Add the duplicated folder to the data
                data.push(duplicatedFolder);

                // Update the database with the modified data
                await set(databaseRef, data);

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
