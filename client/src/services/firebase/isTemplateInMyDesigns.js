import { get, set, ref, getDatabase } from "firebase/database";

export async function isTemplateInMyDesigns(authId, templateId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);

    try {
        const snapshot = await get(databaseRef);
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
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
