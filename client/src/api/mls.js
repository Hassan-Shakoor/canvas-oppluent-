import axios from 'axios';
import { APIS } from '../shared/routes';

export const fetchProperty = async (data) => {
  try {
    const response = await axios.get(APIS.searchMLS, {
      params: {
        search: data,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};