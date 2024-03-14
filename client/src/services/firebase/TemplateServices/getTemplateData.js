import { get, ref, getDatabase } from "firebase/database";
import { getTemplateFromFoldersRecursive } from "./getTemplateFromFolders";


export async function getTemplateJsonData(authId, id) {
  // id = parseInt(id, 10);

  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);
  const folderDataRef = ref(database, `${authId}/folderData`);

  try {
    const snapshot = await get(databaseRef);
    const folderData = await get(folderDataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const item of data) {
        if (item?.template) {
          const matchingTemplate = item.template.find((template) => template.id === id);
          if (matchingTemplate) {
            return matchingTemplate;
          }
        }
      }

      if (folderData.exists()) {
        const folders = folderData.val()
        for (const folder of folders) {
          if (folder?.template) {
            const matchingTemplate = folder.template.find((template) => template.id === id);
            if (matchingTemplate) {
              return matchingTemplate;
            }
          }
          if (folder.folders) {
            const matchingTemplate = await getTemplateFromFoldersRecursive(folder.folders, id);

            if (matchingTemplate) {
              return matchingTemplate;
            }
          }
        }
      }

      console.log(`No template data found with id ${id}`);

      return null;
    } else {
      console.log("Data does not exist");
    }


  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    throw error;
  }
}
