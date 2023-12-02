import { get, ref, getDatabase } from "firebase/database";

export async function getTemplateJsonData(authId, id) {
  id = parseInt(id, 10);

  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);

  try {
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const item of data) {
        if (item.template) {
          const matchingTemplate = item.template.find((templateItem) => templateItem.id === id);
          if (matchingTemplate) {
            console.log(matchingTemplate);
            return matchingTemplate;
          }
        }
      }

      console.log(`No template data found with id ${id}`);
      return null;
    } else {
      console.log("Data does not exist");
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    throw error;
  }
}
