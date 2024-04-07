import { get, set, ref, getDatabase } from "firebase/database";

export async function deleteTemplateFromTemplate(authId, templateId) {
    try {
        const database = getDatabase();
        const databaseRef = ref(database, `${authId}/templateData`);

        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            for (const key in data) {
                const item = data[key];
                if (item.template) {
                    const templateIndex = item.template.findIndex(template => template.id === templateId);
                    if (templateIndex !== -1) {
                        // Remove the template at the found index
                        item.template.splice(templateIndex, 1);

                        await set(databaseRef, data);

                        console.log("Template Deleted Successfully");
                        return true;
                    }
                }
            }
        }

        console.log("Data does not exist");
        return true;
    } catch (error) {
        console.error('Error deleting template in Firebase:', error);
        throw error;
    }
}
