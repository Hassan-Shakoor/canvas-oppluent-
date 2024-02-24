import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function moveFromFolderToFolder(authId, templateId, folderId) {
    const database = getDatabase();
    const folderDataRef = ref(database, `${authId}/folderData`);

    try {
        const folderSnapshot = await get(folderDataRef);

        if (folderSnapshot.exists()) {
            const folderData = folderSnapshot.val();

            // Find the item with the specified templateId
            const item = folderData.find(item => item.template && item.template.some(template => template.id === templateId));

            if (item) {
                const templateIndex = item.template.findIndex(template => template.id === templateId);

                // Find the destination folder
                const destinationFolder = folderData.find(folder => folder.id === folderId);

                if (destinationFolder) {
                    // Create a duplicate of the matching template
                    const duplicatedTemplate = { ...item.template[templateIndex] };

                    if (!destinationFolder.template) {
                        destinationFolder.template = [];
                    }

                    // Push the duplicated template to the destination folder's template array
                    destinationFolder.template.push(duplicatedTemplate);

                    // Remove the template from the source folder
                    item.template.splice(templateIndex, 1);

                    // Update the database with the modified folderData
                    await set(folderDataRef, folderData);

                    console.log("Template Moved to Folder Successfully.");
                    return true;
                } else {
                    console.log("Destination folder not found.");
                }
            } else {
                console.log("Template not found.");
            }
        } else {
            console.log("Data does not exist.");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
