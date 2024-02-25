import { get, set, ref, getDatabase } from "firebase/database";

export async function publishTemplate(authId, templateObject) {
    const database = getDatabase();
    const databaseRef = ref(database);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const dataJson = snapshot.val();

            const selectedCategory = templateObject.docSpecs.designID;

            for (const [userId, { templateData }] of Object.entries(dataJson)) {
                if (userId === authId) {
                    continue;
                }
                for (const [index, data] of templateData?.entries()) {
                    if (data?.id === selectedCategory) {
                        // console.log(dbJson);
                        console.log(selectedCategory);

                        const publishTemplate = {
                            ...templateObject,
                            published: true,
                            visible: true,
                        };

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

            console.log("Template Published Successfully.");
        } else {
            console.log("Data does not exist");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}
