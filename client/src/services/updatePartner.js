import { auth } from "../configs/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, child, onValue, push} from "firebase/database";


const createPartnerData = async (partnerData) => {
    try{
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const partnerListRef = ref(database, `${uid}/partners`);
            const newPostRef = push(partnerListRef)
            await set(newPostRef, partnerData);
          }
        });
    }catch(err){
        console.log(err)
    }
}

const fetchPartner = async (fetchData) => {
    try{
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const partnersRef = ref(database, `${uid}/partners`);
            onValue(partnersRef, (snapshot)=>{
                let partnerData = []
                snapshot.forEach((childSanpshot)=>{
                    const data = childSanpshot.val()
                    const key = childSanpshot.key
                    const keyValue = {
                        id: key,
                        ...data
                    }
                    partnerData.push(keyValue)
                })
                // console.log(partnerData)
                fetchData(partnerData)
            })
        }
    })
    }catch(err){
        console.log(err)
    }
}

const updatePartnerInformation = async (partnerData) => {
    try{
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const partnerRef = ref(database, `${uid}/partners/${partnerData.id}`);
              const response = await set(partnerRef, partnerData);
              return response;
            }
        });
    }catch(err) {
        console.log(err)
    }
}

const updatePrimaryPartner = async (partnerData) => {
    try{
        const database = getDatabase();
        let existingPrimaryPartner;
        let currentPartner;
        // console.log(partnerData, "Partner Data")
        if(partnerData?.length > 1 ){
            existingPrimaryPartner = partnerData[0]
            currentPartner = partnerData[1]
        }else {
            currentPartner = partnerData[0]
        }
        
        // console.log(existingPrimaryPartner, currentPartner)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid
                if(partnerData?.length > 1){
                    const existingPartnerRef = ref(database, `${uid}/partners/${existingPrimaryPartner.id}`)
                    const currentPartnerRef = ref(database, `${uid}/partners/${currentPartner.id}`)
                    const existingPrimaryRef = child(existingPartnerRef, "primary");
                    const currentPrimaryRef = child(currentPartnerRef, "primary");
                    await set(existingPrimaryRef, existingPrimaryPartner?.primary)
                    await set(currentPrimaryRef, currentPartner?.primary)
                }else {
                    const currentPartnerRef = ref(database, `${uid}/partners/${currentPartner.id}`)
                    const currentPrimaryRef = child(currentPartnerRef, "primary");
                    await set(currentPrimaryRef, currentPartner?.primary)
                }   
                return true
            }
          });
    }catch(err){
        console.log(err)
    }
}

const deletePartnerById = async (partnerId) => {
    try {
        const database = getDatabase();
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            if(partnerId === 0){
                const partnersRef = ref(database, `${uid}/partners`);
                const response = await set(partnersRef, null);
                return response
            }else{
                const partnerRef = ref(database, `${uid}/partners/${partnerId}`);
                const response = await set(partnerRef, null);
                return response
            }
          }
        });

    } catch(err) {
        console.log(err)
    }
} 

export {updatePrimaryPartner, updatePartnerInformation, deletePartnerById, fetchPartner, createPartnerData}