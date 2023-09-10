// ** Import Dependencies
import axios from 'axios'
import { APIS } from '../shared/routes'

export const fetchQrCode = async (data) => {
    try{
        const response = await axios.get(APIS.generateQR, {
            params: {
                url:data
            }
        })
        return response.data
    }catch (error) {
        console.log('Error',error)
        throw error
    }
}




