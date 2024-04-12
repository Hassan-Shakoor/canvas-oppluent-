import { get, set, ref, getDatabase } from "firebase/database";
import { deleteTemplateFromFoldersRecursive } from "./deleteTemplate";

export async function deleteTemplatesinBatch(authId, templateIds) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/templateData`);
    const folderDataRef = ref(database, `${authId}/folderData`);
    let deleteSuccess = new Array(templateIds.length).fill(false);

    try {
        const snapshot = await get(databaseRef);
        const folderDataSnapshot = await get(folderDataRef);

        if (snapshot.exists()) {
            const data = snapshot.val();

            for (const item of data) {
                if (item.template) {
                    templateIds.forEach((templateId, index) => {
                        const templateIndex = item.template.findIndex(template => template.id === templateId);
                        if (templateIndex !== -1) {
                            item.template.splice(templateIndex, 1);
                            deleteSuccess[index] = true;
                        }
                    });
                }
            }

            if (deleteSuccess.some(value => value === false)) {
                if (folderDataSnapshot.exists()) {
                    const folderData = folderDataSnapshot.val();


                    for (const folder of folderData) {
                        if (folder?.template) {
                            for (let i = 0; i < templateIds.length; i++) {
                                if (deleteSuccess[i]) {
                                    continue; // Exit forEach loop if template already deleted
                                }
                                const templateIndex = folder.template.findIndex(template => template.id === templateIds[i]);
                                if (templateIndex !== -1) {
                                    folder.template.splice(templateIndex, 1);
                                    deleteSuccess[i] = true;
                                }
                            }
                        }

                        if (folder.folders) {
                            for (let i = 0; i < templateIds.length; i++) {
                                if (deleteSuccess[i]) {
                                    continue; // Skip if template already deleted
                                }
                                const response = await deleteTemplateFromFoldersRecursive(folder.folders, templateIds[i]);
                                if (response) {
                                    deleteSuccess[i] = true;
                                }
                            }
                        }
                    }
                    if (deleteSuccess.every(success => success)) {
                        await set(folderDataRef, folderData);
                        await set(databaseRef, data);
                        console.log("Templates deleted successfully");
                        return true;
                    } else {
                        console.log("Failed to delete all templates");
                        return false;
                    }
                }
            } else {
                console.log("No templates to delete");
            }
            if (deleteSuccess.every(success => success)) {
                await set(databaseRef, data);
                console.log("Templates deleted successfully");
                return true;
            } else {
                console.log("Failed to delete all templates");
                return false;
            }
        } else {
            console.log("Data does not exist");
            return false;
        }
    } catch (error) {
        console.error('Error deleting templates in Firebase:', error);
        throw error;
    }
}
