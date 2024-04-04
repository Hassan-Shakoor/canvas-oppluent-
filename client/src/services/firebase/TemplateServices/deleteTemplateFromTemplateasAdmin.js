import { get, set, ref, getDatabase, runTransaction } from "firebase/database";
import { deleteTemplateFromTemplate } from "./deleteTemplateFromTemplate";

export async function deleteTemplateFromTemplateasAdmin(templateId) {
    const database = getDatabase();
    const databaseRef = ref(database);

    try {
        const snapshot = await get(databaseRef);

        if (!snapshot.exists()) {
            console.log("Data does not exist");
            return false;
        }

        const dataJson = snapshot.val();

        const transactionResult = await runTransaction(databaseRef, (currentData) => {
            if (!currentData) {
                console.log("Data does not exist");
                return;
            }

            for (const [userId, userData] of Object.entries(currentData)) {
                const { templateData } = userData;
                if (templateData) {
                    const response = deleteTemplateFromTemplate(userId, templateId);
                    if (!response) {
                        console.log("Error in Template delete for user:", userId);
                        return;
                    }
                }
            }

            return currentData;
        });

        if (transactionResult.committed) {
            console.log("All template deletions committed successfully");
            return true;
        } else {
            console.log("Transaction aborted:", transactionResult.error);
            return false;
        }
    } catch (error) {
        console.error('Error deleting template in Firebase:', error);
        throw error;
    }
}
