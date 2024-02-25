import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function createFolder(authId, folderName) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const folderData = snapshot.val();

            // Add the new folderData to the array
            const newFolder = {
                name: folderName,
                id: uuidv4(),
                created: formatDate(Date.now()),
                template: {}
            };

            const nextKey = Object.keys(folderData).length

            // Update the folderData array with the new folder
            await set(databaseRef, {
                ...folderData,
                [nextKey]: newFolder
            });

            console.log("Folder Created Successfully.");
        } else {
            const databaseRef = ref(database, `${authId}`);
            const snapshot = await get(databaseRef);
            if (snapshot.exists()) {
                const data = snapshot.val();

                const initialData = {
                    ...data,
                    folderData: {
                        0: {
                            name: folderName,
                            id: uuidv4(),
                            created: formatDate(Date.now()),
                            template: {}
                        }
                    }
                }

                // Set the initial data in Firebase
                await set(databaseRef, initialData);
            }
        };

        return true;

    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
