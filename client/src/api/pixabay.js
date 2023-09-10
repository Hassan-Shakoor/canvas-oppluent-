import axios from 'axios';
import { APIS } from '../shared/routes';

export const fetchImagesPixabay = async (data) => {
  try {
    const response = await axios.get(APIS.searchPixabay, {
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
