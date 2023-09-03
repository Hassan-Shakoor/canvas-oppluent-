// ** Import Dependencies
import axios from 'axios'
import { APIS } from '../shared/routes'

// export const fetchImagesPixabay = async (data) => await  (APIS.searchPixabay+`?q=${data}`)
export const fetchImagesPixabay = async (data) => await axios.get(APIS.searchPixabay+`?q=${data}`)