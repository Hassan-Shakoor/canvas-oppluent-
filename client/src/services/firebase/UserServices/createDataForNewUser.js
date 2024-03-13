import { get, getDatabase, push, ref, set } from "firebase/database";

export async function createDataForNewUser(user, userData) {
    try {
        const database = getDatabase();

        // Get admin data from the database
        const adminUserDataRef = ref(database, `MbuaNUH4dqX0Z753oLs7n7lDN1K2`);
        const adminUserDataSnapshot = await get(adminUserDataRef);

        if (adminUserDataSnapshot.exists()) {
            const adminUserData = adminUserDataSnapshot.val();

            // Extract template data from admin data
            const adminTemplateData = adminUserData?.templateData || [];

            const adminTemplatesWithoutMyDesign = adminTemplateData.filter(category => category.id !== 0 && category.id !== 53);

            // Filter out templates with allowedUsers set to true
            const updatedTemplatesData = adminTemplatesWithoutMyDesign.map(category => {
                if (category?.template && category.template.length > 0) {
                    const filteredTemplates = category.template.filter(template => !template.allowedUsers);
                    return { ...category, template: filteredTemplates };
                }
                return category;
            });

            // Add user data to the Realtime Database
            const userDataToSave = {
                [user.uid]: {
                    accountInformation: {
                        profile: {
                            contactNo: userData.contact || '',
                            email: userData.email || '',
                            firstName: userData.firstName || '',
                            lastName: userData.lastName || '',
                            isAdmin: false,
                            language: "English",
                            profileImage: userData.profileImage
                        }
                    },
                    forderData: {},
                    partners: {},
                    templateData: updatedTemplatesData,
                    userData: { [user.uid]: userData.firstName || '' },
                    userJson: adminUserData?.userJson || {}
                }
            };

            // Get a reference to the 'users' array in the Realtime Database
            const usersRef = ref(database);
            const snapshot = await get(usersRef);
            if (snapshot.exists()) {
                const dataJson = snapshot.val();
                // Push userDataToSave to the 'users' array
                const updatedUsersData = { ...dataJson, ...userDataToSave };
                await set(usersRef, updatedUsersData);
                console.log('User data created successfully.');
                return true;
            }

        } else {
            console.error('Admin user data not found.');
        }
    } catch (error) {
        console.error('Error creating user data:', error);
    }
    return false;
}
