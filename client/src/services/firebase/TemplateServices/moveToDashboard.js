import { get, set, ref, getDatabase } from "firebase/database";
import { getTemplateFromFoldersRecursive } from "./getTemplateFromFolders";
import { deleteTemplateFromFoldersRecursive } from "./deleteTemplate";

export async function moveToDashboard(authId, templateId) {
    const database = getDatabase();
    const folderDataRef = ref(database, `${authId}/folderData`);
    const templateDataRef = ref(database, `${authId}/templateData`);

    try {
        // Retrieve data snapshots in parallel
        const [folderSnapshot, templateDataSnapshot] = await Promise.all([
            get(folderDataRef),
            get(templateDataRef),
        ]);

        // Check if both snapshots exist
        if (folderSnapshot.exists() && templateDataSnapshot.exists()) {
            const folderData = folderSnapshot.val();
            const templateData = templateDataSnapshot.val();

            // Iterate through folderData
            for (const folder of folderData) {
                const templateIndex = folder?.template?.findIndex(template => template.id === templateId);
                let matchingTemplate;

                // Check if the template is not in the current folder, and search in nested folders
                if ((!templateIndex || templateIndex === -1) && folder.folders) {
                    matchingTemplate = await getTemplateFromFoldersRecursive(folder?.folders, templateId);
                }

                // Check if template is found
                if (templateIndex && templateIndex !== -1 || matchingTemplate) {
                    const destination = templateData.find(category => category.id === 0);

                    // Check if destination folder exists
                    if (destination) {
                        // Add the template to the destination folder
                        if (!destination.template) {
                            destination.template = [];  // If the template array doesn't exist, create it
                        }

                        const templateToMove = templateIndex && templateIndex !== -1
                            ? folder.template[templateIndex]
                            : matchingTemplate;

                        destination.template?.push({ ...templateToMove });

                        // Update the folderData array
                        await set(folderDataRef, folderData);

                        // Delete the template from the source folder and nested folders
                        const response = await deleteTemplateFromFoldersRecursive(folder.folders, templateId);

                        // Update the templateData array
                        if (response) {
                            await set(templateDataRef, templateData);
                        }

                        console.log("Template Moved to Dashboard Successfully.");
                        return true;
                    } else {
                        console.log("Destination folder not found.");
                    }
                    break;
                } else {
                    console.log("Template not found.");
                }
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
