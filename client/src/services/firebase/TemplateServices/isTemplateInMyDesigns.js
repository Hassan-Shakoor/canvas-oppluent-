import { get, set, ref, getDatabase } from "firebase/database";
import { getTemplateFromFoldersRecursive } from "./getTemplateFromFolders";

export async function isTemplateInMyDesigns(authId, templateId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);
    const folderDataRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);
        const folderData = await get(folderDataRef);
        if (snapshot.exists()) {
            const templateData = snapshot.val();
            for (const item of templateData) {
                if (item.template) {
                    const matchingTemplateIndex = item.template.findIndex((templateItem) => templateItem.id === templateId);

                    if (matchingTemplateIndex !== -1 && item.id === 0) {
                        console.log("Template Already Available in my Designs.")
                        return { templateObject: item.template[matchingTemplateIndex], isTemplateInMyDesigns: true };
                    }

                    if (matchingTemplateIndex !== -1) {
                        console.log("Template Not Available in My Designs.")
                        return { templateObject: item.template[matchingTemplateIndex], isTemplateInMyDesigns: false };
                        // break;
                    }
                }
            }

            console.log("Data retrieved successfully");
        } else {
            console.log("Data does not exist");
        }

        if (folderData.exists()) {

            const folders = folderData.val();
            for (const folder of folders) {
                if (folder.template) {
                    const matchingTemplateIndex = folder.template.findIndex((templateItem) => templateItem.id === templateId);

                    if (matchingTemplateIndex !== -1) {
                        console.log("Template Not Available in My Designs.")
                        return { templateObject: folder.template[matchingTemplateIndex], isTemplateInMyDesigns: true };
                        // break;
                    }
                }

                if (folder.folders) {
                    const matchingTemplate = getTemplateFromFoldersRecursive(folder.folders, templateId);
                    if (matchingTemplate) {
                        return { templateObject: matchingTemplate, isTemplateInMyDesigns: true };

                    }
                }
            }

            console.log("Data retrieved successfully");
        } else {
            console.log("Data does not exist");
        }

    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
