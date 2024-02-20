import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function moveToDashboard(authId, templateId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);
    const templateDataRef = ref(database, `${authId}/templateData`);

    try {
        const folderSnapshot = await get(databaseRef);
        const templateDataSnapshot = await get(templateDataRef);

        if (folderSnapshot.exists() && templateDataSnapshot.exists()) {
            const folderData = folderSnapshot.val();
            const templateData = templateDataSnapshot.val();

            for (const item of folderData) {
                if (item.template) {
                    const templateIndex = item.template.findIndex(template => template.id === templateId);
                    console.log(templateIndex)
                    if (templateIndex !== -1) {
                        const destination = templateData.find(category => category.id === 0);

                        if (destination) {
                            // Add the item to the destination folder
                            if (!destination.template) {
                                // If template array doesn't exist, create it
                                destination.template = [];
                            }
                            destination.template?.push(item?.template[templateIndex]);
                            // Update the folderData array
                            await set(databaseRef, folderData);

                            item.template.splice(templateIndex, 1);

                            await set(templateDataRef, templateData);

                            console.log("Item Moved to Dashboard Successfully.");
                            return;
                        } else {
                            console.log("Destination folder not found.");
                        }
                        break;
                    }
                } else {
                    console.log("Item not found.");
                }
            }
        } else {
            console.log("Data does not exist.");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
