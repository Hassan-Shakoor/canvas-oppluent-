import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function moveToFolder(authId, templateId, folderId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);
    const templateDataRef = ref(database, `${authId}/templateData`);

    try {
        const folderSnapshot = await get(databaseRef);
        const templateDataSnapshot = await get(templateDataRef);

        if (folderSnapshot.exists() && templateDataSnapshot.exists()) {
            const folderData = folderSnapshot.val();
            const templateData = templateDataSnapshot.val();

            for (const item of templateData) {
                if (item.template) {
                    const templateIndex = item.template.findIndex(template => template.id === templateId);
                    console.log(templateIndex)
                    if (templateIndex !== -1) {
                        const destinationFolder = folderData.find(folder => folder.id === folderId);

                        if (destinationFolder) {
                            // Add the item to the destination folder
                            if (!destinationFolder.template) {
                                // If template array doesn't exist, create it
                                destinationFolder.template = [];
                            }
                            destinationFolder.template?.push(item?.template[templateIndex]);
                            // Update the folderData array
                            await set(databaseRef, folderData);

                            item.template.splice(templateIndex, 1);

                            await set(templateDataRef, templateData);

                            console.log("Item Moved to Folder Successfully.");
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
