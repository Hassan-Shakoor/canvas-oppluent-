import { get, set, ref, push, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function duplicateTemplate(authId, templateId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);

    try {
        const snapshot = await get(databaseRef);
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

            console.log("Matching template not found");
            return false;
        } else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error duplicating template in Firebase:', error);
        throw error;
    }
}
