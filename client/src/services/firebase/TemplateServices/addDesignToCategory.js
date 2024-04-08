import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function addDesignToCategory(authId, templateObject, categoryId) {
    const database = getDatabase();
    const databaseRef = ref(database);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const dataJson = snapshot.val();

            // const selectedCategory = templateObject.docSpecs.designID;
            const allowedUsers = templateObject.allowedUsers;

            const publishTemplate = {
                ...templateObject,
                published: true,
                visible: true,
                id: uuidv4()
            };

            for (const [userId, { templateData }] of Object.entries(dataJson)) {
                if ((allowedUsers?.length > 0 && !allowedUsers?.includes(userId))) {
                    continue;
                }

                for (const [index, data] of templateData?.entries()) {
                    if (data?.id === categoryId) {
                        // console.log(dbJson);
                        console.log(categoryId);



                        // Push the templateObject to the data.template array
                        const templateDataRef = ref(database, `${userId}/templateData/${index}/template`);
                        console.log(Object.keys(data.template).length);

                        const nextKey = Object.keys(data.template).length;

                        set(templateDataRef, {
                            ...data.template,
                            [nextKey]: publishTemplate,
                        });

                        break;
                    }
                }
            }
            console.log("Template Moved to Category Successfully.");
            return true;
        } else {
            console.log("Data does not exist");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
    return false;
}
