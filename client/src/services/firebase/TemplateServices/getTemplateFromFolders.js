import { get, ref, getDatabase } from "firebase/database";

export async function getTemplateFromFolders(authId, templateId) {
    const database = getDatabase();
    const folderDatabaseRef = ref(database, `${authId}/folderData`);
    const templateDatabaseRef = ref(database, `${authId}/templateData`);

    try {
        const folderSnapshot = await get(folderDatabaseRef);
        const templateSnapshot = await get(templateDatabaseRef);

        if (folderSnapshot.exists() && templateSnapshot.exists()) {
            const folderData = folderSnapshot.val();
            const templateData = templateSnapshot.val();

            // Search for the template in folderData
            for (const folder of folderData) {
                if (folder?.template) {
                    const matchingTemplate = folder.template.find(template => template.id === templateId);
                    if (matchingTemplate) {
                        return { ...matchingTemplate };
                    }
                }

                if (folder?.folders) {
                    const matchingTemplate = getTemplateFromFoldersRecursive(folder.folders, templateId);
                    if (matchingTemplate) {
                        return { ...matchingTemplate };
                    }
                }
            }
        } else {
            console.log("Data does not exist.");
        }
    } catch (error) {
        console.error('Error retrieving data from Firebase:', error);
        throw error;
    }

    return null;
}

export const getTemplateFromFoldersRecursive = (folders, templateId) => {
    if (folders.length > 0) {
        for (const folder of folders) {
            const matchingTemplate = folder.template.find(template => template.id === templateId);
            if (matchingTemplate) {
                return { ...matchingTemplate };
            }

            if (folder.folders) {
                const recursiveMatch = getTemplateFromFoldersRecursive(folder.folders, templateId);
                if (recursiveMatch) {
                    return recursiveMatch;
                }
            }
        }
    }

    return null;
};
