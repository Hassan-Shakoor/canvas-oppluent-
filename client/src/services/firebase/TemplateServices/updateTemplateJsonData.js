import { get, set, ref, getDatabase } from "firebase/database";
import { getTemplateFromFoldersRecursive } from "./getTemplateFromFolders";

export async function updateTemplateJsonData(authId, updatedObject, templateURL) {
  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);
  const folderDataRef = ref(database, `${authId}/folderData`);


  try {
    const snapshot = await get(databaseRef);
    const folderDataSnapshot = await get(folderDataRef);

    const updatedStorageURLs = updatedObject.storage_url.map((url, index) =>
      index === 0 ? templateURL : url
    );
    
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
            storage_url: updatedStorageURLs
          }

          if (matchingTemplateIndex !== -1) {
            item.template[matchingTemplateIndex] = updatedTemplate;
            await set(databaseRef, data);
            return true;
          }
        }
      }

      console.log("Data updated successfully");
    }
    if (folderDataSnapshot.exists()) {
      const folderData = folderDataSnapshot.val();
      for (const folder of folderData) {
        if (folder?.template) {
          const matchingTemplate = folder.template.find(template => template.id === updatedObject.id)

          if (matchingTemplate) {
            // const updatedStorageURLs = updatedObject.storage_url.map((url, index) =>
            //   index === 0 ? templateURL : url
            // );

            const updatedTemplate = {
              ...updatedObject,
              published: true,
              visible: true,
              modified: formatDate(Date.now()),
              storage_url: updatedStorageURLs
            }
            matchingTemplate = updatedTemplate;
            await set(folderDataRef, folderData);
            console.log("Data updated successfully");
            return true;
          }
        }
        if (folder.folders) {
          const matchingTemplate = await getTemplateFromFoldersRecursive(folder.folders, updatedObject.id);

          if (matchingTemplate) {

            // const updatedStorageURLs = updatedObject.storage_url.map((url, index) =>
            //   index === 0 ? templateURL : url
            // );

            const updatedTemplate = {
              ...updatedObject,
              published: true,
              visible: true,
              modified: formatDate(Date.now()),
              storage_url: updatedStorageURLs
            }

            matchingTemplate = updatedTemplate;
            await set(folderDataRef, folderData);
            console.log("Data updated successfully");
            return true;
          }

        }
      }

    }
    else {
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
