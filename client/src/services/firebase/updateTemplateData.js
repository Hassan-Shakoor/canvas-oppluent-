import { get, set, ref, getDatabase } from "firebase/database";

export async function updateTemplateJsonData(authId, updatedObject) {
  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);

  try {
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const item of data) {
        if (item.template) {
          const matchingTemplateIndex = item.template.findIndex((templateItem) => templateItem.id === updatedObject.id);
          if (matchingTemplateIndex !== -1) {
            item.template[matchingTemplateIndex] = updatedObject;
            break;
          }
        }
      }
      await set(databaseRef, data);

      console.log("Data updated successfully");
    } else {
      console.log("Data does not exist");
    }
  } catch (error) {
    console.error('Error updating data in Firebase:', error);
    throw error;
  }
}
