import { get, set, ref, getDatabase } from "firebase/database";

export async function createMyDesign(authId, templateObject, templateId) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);

    try {
        const snapshot = await get(databaseRef);
        if (snapshot.exists()) {
            const templateData = snapshot.val();

            const hasIdZero = templateData.some(item => item.id === 0);

            // If id 0 doesn't exist, push a new object into the array
            if (!hasIdZero) {
                templateData.push({ id: 0, subHeading: 'My Designs', template: [] });
            }

            for (const [index, data] of templateData?.entries()) {
                if (data?.id === 0) {
                    // console.log(dbJson);
                    // console.log(selectedCategory);

                    const designTemplate = {
                        ...templateObject,
                        published: true,
                        visible: true,
                        isMyDesign: true,
                        id: templateId,
                        modified: formatDate(Date.now())
                    };

                    // Push the templateObject to the data.template array
                    const templateDataRef = ref(database, `${authId}/templateData/${index}/template`);
                    // console.log(Object.keys(data.template).length);

                    const nextKey = Object.keys(data.template).length;

                    set(templateDataRef, {
                        ...data.template,
                        [nextKey]: designTemplate,
                    });

                    break;
                }
            }

            console.log("Template Added to My Design Successfully.");
        } else {
            console.log("Data does not exist");
        }
    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
