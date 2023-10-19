import { get, set, ref, getDatabase } from "firebase/database";

export async function updateTemplateJsonData(authId, updatedObject) {
  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);

  try {
    /*updatedObject = {
        "cardTitle": "Email Signature",
        "created": "2023-08-16",
        "favorite": false,
        "id": 111,
        "imageUrl": "/images/Email_Signature-0.jpg",
        "modified": "2023-08-17",
        "developer": "Zohaib Amir"
      }*/
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      const data = snapshot.val();

      // Find the item with the specified id and update it with the provided object
      for (const item of data) {
        if (item.template) {
          const matchingTemplateIndex = item.template.findIndex((templateItem) => templateItem.id === updatedObject.id);
          if (matchingTemplateIndex !== -1) {
            item.template[matchingTemplateIndex] = updatedObject;
            break;
          }
        }
      }

      // Save the updated data back to Firebase
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
