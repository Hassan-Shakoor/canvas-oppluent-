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

          const updatedTemplate = {
            ...updatedObject,
            published: true,
            visible: true,
            modified: formatDate(Date.now()),
          }

          if (matchingTemplateIndex !== -1) {
            item.template[matchingTemplateIndex] = updatedTemplate;
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

const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
