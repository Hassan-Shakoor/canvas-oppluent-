import { get, set, ref, getDatabase } from "firebase/database";

export async function renameTemplate(authId, templateId, newCardTitle) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);
    const folderDataRef = ref(database, `${authId}/folderData`);

    try {
        const [templateSnapshot, folderDataSnapshot] = await Promise.all([
            get(databaseRef),
            get(folderDataRef),
        ]);

        if (templateSnapshot.exists()) {
            const data = templateSnapshot.val();

            for (const item of data) {
                if (item.template) {
                    const matchingTemplate = item.template.find(template => template.id === templateId);
                    if (matchingTemplate) {
                        matchingTemplate.cardTitle = newCardTitle;

                        await set(databaseRef, data);
                        console.log("Template updated successfully");
                        return true;
                    }
                }
            }
        }

        if (folderDataSnapshot.exists()) {
            const folderData = folderDataSnapshot.val();

            for (const folder of folderData) {
                if (folder.template) {
                    const matchingTemplate = folder.template.find(template => template.id === templateId);

                    if (matchingTemplate) {
                        matchingTemplate.cardTitle = newCardTitle;
                        await set(folderDataRef, folderData);
                        console.log("Template updated successfully");
                        return true;
                    }
                }

                if (folder.folders) {
                    const matchingTemplate = await renameTemplateFromFoldersRecursive(folder.folders, templateId, newCardTitle);

                    if (matchingTemplate) {
                        await set(folderDataRef, folderData);
                        console.log("Template updated successfully");
                        return true;
                    }
                }
            }
        } else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
    return false;
}

export const renameTemplateFromFoldersRecursive = (folders, templateId, newCardTitle) => {
    if (folders.length > 0) {
        for (const folder of folders) {
            const matchingTemplate = folder.template.find(template => template.id === templateId);
            if (matchingTemplate) {
                matchingTemplate.cardTitle = newCardTitle;
                return true;
            }

            if (folder.folders) {
                const response = renameTemplateFromFoldersRecursive(folder.folders, templateId);
                if (response) {
                    return true;
                }
            }
        }
    }

    return false;
};
