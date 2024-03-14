import { get, set, ref, getDatabase } from "firebase/database";

export async function deleteTemplate(authId, templateId) {
  const database = getDatabase();
  const databaseRef = ref(database, `${authId}/templateData`);
  const folderDataRef = ref(database, `${authId}/folderData`);

  try {
    const snapshot = await get(databaseRef);
    const folderDataSnapshot = await get(folderDataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const item of data) {
        if (item.template) {
          const templateIndex = item.template.findIndex(template => template.id === templateId);
          if (typeof templateIndex !== 'undefined' && (templateIndex !== -1 || templateIndex === 0)) {
            // Remove the template at the found index
            item.template.splice(templateIndex, 1);

            await set(databaseRef, data);

            console.log("Template deleted successfully");
            return true;
          }
        }
      }
    }
    if (folderDataSnapshot.exists()) {
      const folderData = folderDataSnapshot.val();
      for (const folder of folderData) {

        if (folder?.template) {
          const templateIndex = folder.template.findIndex(template => template.id === templateId);
          if (typeof templateIndex !== 'undefined' && (templateIndex !== -1 || templateIndex === 0)) {
            // Remove the template at the found index
            folder.template.splice(templateIndex, 1);
            await set(folderDataRef, folderData);
            console.log("Template deleted successfully");
            return true;
          }
        }
        if (folder.folders) {
          const response = await deleteTemplateFromFoldersRecursive(folder.folders, templateId);
          if (response) {
            await set(folderDataRef, folderData);
            return true;
          }
        }
      }

    }

    console.log("Data does not exist");


  } catch (error) {
    console.error('Error deleting template in Firebase:', error);
    throw error;
  }

  return false;
}

export const deleteTemplateFromFoldersRecursive = (folders, templateId) => {
  if (folders && folders.length > 0) {
    for (const folder of folders) {
      const templateIndex = folder.template?.findIndex(template => template.id === templateId);
      if (typeof templateIndex !== 'undefined' && (templateIndex !== -1 || templateIndex === 0)) {
        // Remove the template at the found index
        folder.template?.splice(templateIndex, 1);
        return true;
      }

      if (folder.folders) {
        const recursiveMatch = deleteTemplateFromFoldersRecursive(folder.folders, templateId);
        if (recursiveMatch) {
          return recursiveMatch;
        }
      }
    }
  }

  return false;
};