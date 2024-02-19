import { get, set, ref, getDatabase } from "firebase/database";

export async function renameTemplate(authId, templateId, newCardTitle) {
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
                        matchingTemplate.cardTitle = newCardTitle;
                        break;
                    }
                }
            }
            await set(databaseRef, data);

            console.log("Data updated successfully");
            return true;
        } else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
