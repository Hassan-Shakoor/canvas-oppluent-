import { get, set, ref, getDatabase } from "firebase/database";

export async function deleteTemplateFromTemplateasAdmin(templateId) {
    try {
        const database = getDatabase();
        const databaseRef = ref(database);

        const snapshot = await get(databaseRef);

        if (!snapshot.exists()) {
            console.log("Data does not exist");
            return false;
        }

        const currentData = snapshot.val();
        if (!currentData) {
            console.log("Data is null");
            return false;
        }

        const updatedData = { ...currentData };
        let deleteSuccess = true;

        for (const [userId, userData] of Object.entries(updatedData)) {
            const { templateData } = userData;
            if (templateData) {
                try {
                    for (const key in templateData) {
                        const item = templateData[key];
                        if (item.template && item.template?.length > 0) {
                            const templateIndex = item.template?.findIndex(template => template.id === templateId);
                            if (templateIndex !== -1) {
                                item.template?.splice(templateIndex, 1);
                                console.log("Template Deleted Successfully");
                            }
                        }
                    }
                } catch (error) {
                    console.log("Error in Template delete for user:", userId);
                    deleteSuccess = false;
                    break;
                }

                updatedData[userId].templateData = templateData;
            }
        }

        if (deleteSuccess) {
            await set(databaseRef, updatedData);
            console.log("All template deletions committed successfully");
            return true;
        } else {
            console.log("Transaction aborted due to errors");
            return false;
        }
    } catch (error) {
        console.error('Error deleting template in Firebase:', error);
        throw error;
    }
}
