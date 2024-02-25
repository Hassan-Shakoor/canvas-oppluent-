import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function addDesignToCategory(authId, templateId, categoryId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);

    try {
        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const matchingCategory = data.find(category => category?.id === categoryId);

            for (const item of data) {
                if (item.template) {
                    const templateIndex = item.template.findIndex(template => template.id === templateId);

                    if (templateIndex !== -1) {
                        const matchingTemplate = item.template[templateIndex];

                        if (!matchingCategory.template) {
                            matchingCategory.template = [];
                        }

                        // Create a duplicate of the matching template with a new UUID
                        const duplicatedTemplate = { ...matchingTemplate, id: uuidv4() };

                        matchingCategory.template.push(duplicatedTemplate);

                        // Update the database with the modified data
                        await set(databaseRef, data);
                        console.log("Data updated successfully");
                        return true;
                    }
                }
            }
            console.log("Template not found in any category.");
        } else {
            console.log("Data does not exist.");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }

    return false;
}
