import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const auth = btoa("simplyrets:simplyrets");
console.log(`Auth:  ${auth}`);

export const getProperty = async (req, res) => {
  try {
    const response = await axios.get("https://api.simplyrets.com/properties", {
      headers: {
        "Authorization": "Basic " + auth
      }
    });

    // Check if the response status code is 200 (OK)
    if (response.status === 200) {
      // Send the response data as JSON
      res.json(response.data);
    } else {
      // Handle other response status codes (e.g., error responses)
      res.status(response.status).json({ error: 'Failed to retrieve data' });
    }

  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};
