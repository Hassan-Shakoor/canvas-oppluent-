// ** Import Dependencies
import axios from 'axios'
import { APIS } from '../shared/routes'

export const qrCodeResponse = async (data) => await axios.get(APIS.generateQR + `?url=${data}`);





