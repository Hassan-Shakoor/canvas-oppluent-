import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function addDesignToCategory(authId, templateObject, categoryId) {
    const database = getDatabase();
    const databaseRef = ref(database);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const currentData = snapshot.val();

            const allowedUsers = templateObject.allowedUsers;
            const publishTemplate = {
                ...templateObject,
                published: true,
                visible: true,
                id: uuidv4()
            };

            let publishSuccess = true;

            for (const [userId, userData] of Object.entries(currentData)) {
                if (allowedUsers && allowedUsers.length > 0 && !allowedUsers.includes(userId)) {
                    continue; // Skip users not allowed to publish
                }

                // Find the category index or add it if not found
                let categoryIndex = userData.templateData.findIndex(data => data.id === categoryId);
                if (categoryIndex === -1) {
                    userData.templateData.push({ id: categoryId, template: [] });
                    categoryIndex = userData.templateData.length - 1;
                }

                // Get the category object
                const category = userData.templateData[categoryIndex];

                try {
                    // Push the publishTemplate to the category's template array
                    category.template.push(publishTemplate);
                    console.log("Template Published Successfully for category:", categoryId);

                    // Update the specific user's templateData in Firebase
                    await set(ref(database, `${userId}/templateData`), userData.templateData);

                } catch (error) {
                    console.error("Error publishing template for category:", categoryId, "User:", userId, error);
                    publishSuccess = false;
                    break; // Exit the loop if an error occurs
                }
            }

            if (publishSuccess) {
                console.log("All Templates Published successfully");
                return true;
            } else {
                console.log("Transaction aborted due to errors");
                return false;
            }
        } else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
