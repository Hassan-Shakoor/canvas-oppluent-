import { get, set, ref, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export async function createFolderinFolder(authId, folderLocationId, folderName) {
    const database = getDatabase();
    const databaseRef = ref(database, `${authId}/folderData`);

    try {
        const snapshot = await get(databaseRef);

        if (snapshot.exists()) {
            const folderData = snapshot.val();

            // Add the new folderData to the array
            const newFolder = {
                name: folderName,
                id: uuidv4(),
                created: formatDate(Date.now()),
                template: {},
                folders: [],
            };

            const folderLocation = folderData.find(folder => folder.id === folderLocationId);

            let folderDestination;

            if (!folderLocation) {
                folderDestination = await getFolderinFoldersRecursive(folderData, folderLocationId)
            }
            if (folderLocation || folderDestination) {

                if (folderLocation) {
                    if (!folderLocation.folders) {
                        folderLocation.folders = [];
                    }

                    folderLocation.folders.push({ ...newFolder, parentID: folderLocation.id })
                } else {
                    if (!folderDestination.folders) {
                        folderDestination.folders = [];
                    }

                    folderDestination.folders.push({ ...newFolder, parentID: folderDestination.id })
                }

                // Update the folderData array with the new folder
                await set(databaseRef, folderData);

                console.log("Folder Created Successfully.");
                return true;
            }
        }


    } catch (error) {
        console.error('Error updating data in Firebase:', error);
        throw error;
    }
    return false;
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


export const getFolderinFoldersRecursive = (folders, folderLocationId) => {
    if (!Array.isArray(folders)) {
        if (folders.id === folderLocationId) {
            return folders;
        }
    } else {
        if (folders && folders.length > 0) {
            for (const folder of folders) {
                const matchingFolder = folder?.folders?.find(folder => folder.id === folderLocationId);
                if (matchingFolder) {
                    // Remove the template at the found index
                    return matchingFolder;
                }

                if (folder.folders) {
                    const recursiveMatch = getFolderinFoldersRecursive(folder.folders, folderLocationId);
                    if (recursiveMatch) {
                        return recursiveMatch;
                    }
                }
            }
        }
    }
}