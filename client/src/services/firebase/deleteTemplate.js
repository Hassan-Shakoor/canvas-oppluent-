import { get, set, ref, getDatabase } from "firebase/database";

export async function deleteTemplate(authId, templateId) {
  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);

  try {
    const snapshot = await get(databaseRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const item of data) {
        if (item.template) {
          const templateIndex = item.template.findIndex(template => template.id === templateId);
          if (templateIndex !== -1) {
            // Remove the template at the found index
            item.template.splice(templateIndex, 1);

            await set(databaseRef, data);

            console.log("Template deleted successfully");
            return true;
          }
        }
      }

      console.log("Matching template not found");
      return false;
    } else {
      console.log("Data does not exist");
      return false;
    }
  } catch (error) {
    console.error('Error deleting template in Firebase:', error);
    throw error;
  }
}
