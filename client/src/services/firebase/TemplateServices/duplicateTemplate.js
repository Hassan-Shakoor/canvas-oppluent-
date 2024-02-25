import { get, set, ref, push, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function duplicateTemplate(authId, templateId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);
    const folderDataRef = ref(database, `${authId}/folderData`);


    try {
        const snapshot = await get(databaseRef);
        const folderDataSnapshot = await get(folderDataRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            for (const item of data) {
                if (item.template) {
                    const matchingTemplate = item?.template?.find(template => template.id === templateId);
                    if (matchingTemplate) {
                        // Create a duplicate of the matching template
                        const duplicatedTemplate = { ...matchingTemplate, id: uuidv4() };

                        // Push the duplicated template to the template array
                        item.template.push(duplicatedTemplate);

                        // Set the updated data back to the database
                        await set(databaseRef, data);

                        console.log("Template duplicated successfully");
                        return true;
                    }
                }
            }
        }

        if (folderDataSnapshot.exists()) {
            const folderData = folderDataSnapshot.val();
            for (const folder of folderData) {
                if (folder?.template) {
                    const matchingTemplate = folder.template.find(template => template.id === templateId)

                    if (matchingTemplate) {
                        // Create a duplicate of the matching template
                        const duplicatedTemplate = { ...matchingTemplate, id: uuidv4() };

                        // Push the duplicated template to the template array
                        folder.template.push(duplicatedTemplate);

                        await set(folderDataRef, folderData);
                        // Set the updated data back to the database

                        console.log("Template duplicated successfully");
                        return true;
                    }
                }
                if (folder.folders) {
                    const response = await duplicateTemplateFromFoldersRecursive(folder.folders, templateId);

                    if (response) {

                        await set(folderDataRef, folderData);
                        // Set the updated data back to the database

                        console.log("Template duplicated successfully");
                        return true;
                    }

                }
            }

        }

        else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error duplicating template in Firebase:', error);
        throw error;
    }
}

export const duplicateTemplateFromFoldersRecursive = (folders, templateId) => {
    if (folders.length > 0) {
        for (const folder of folders) {
            const matchingTemplate = folder.template.find(template => template.id === templateId);

            if (matchingTemplate) {
                // Create a duplicate of the matching template
                const duplicatedTemplate = { ...matchingTemplate, id: uuidv4() };

                // Push the duplicated template to the template array
                folder.template.push(duplicatedTemplate);

                console.log("Template duplicated successfully");
                return true;
            }


            if (folder.folders) {
                const recursiveMatch = duplicateTemplateFromFoldersRecursive(folder.folders, templateId);
                if (recursiveMatch) {
                    return recursiveMatch;
                }
            }
        }
    }

    return null;
};

