import { getDatabase, ref, get } from "firebase/database";

const getShareTemplateData = async (userId, categoryId, templateId) => {
    const database = getDatabase();
    const databaseRef = ref(database, userId + '/templateData');
    try {
        const snapshot = await get(databaseRef)
        const updatedCategories = snapshot.val();
        const category = updatedCategories.find(category => category.id === parseInt(categoryId));
        if(category){
            const templates = category?.template
            const template = templates.find(template => template.id === parseInt(templateId));
            return template
        }
        return null
    } catch (error) {
        console.log(error)
    }
}

export default getShareTemplateData