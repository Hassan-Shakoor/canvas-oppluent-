import { get, set, ref, getDatabase } from "firebase/database";

export async function publishTemplate(authId, templateObject, templateURL) {
    const database = getDatabase();
    const databaseRef = ref(database);

    const updatedStorageURLs = templateObject?.storage_url?.length > 0 ? (templateObject.storage_url.map((url, index) =>
        index === 0 ? templateURL : url
    )) : [templateURL];


    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const dataJson = snapshot.val();

            const selectedCategory = templateObject.docSpecs.designID;
            const allowedUsers = templateObject.allowedUsers;

            for (const [userId, { templateData }] of Object.entries(dataJson)) {
                if (userId === authId || (allowedUsers?.length > 0 && !allowedUsers?.includes(userId))) {
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
                            storage_url: updatedStorageURLs
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
