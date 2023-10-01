import axios from 'axios';
import _ from 'lodash'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const auth = btoa(`${process.env.SIMPLY_RETS_API_KEY}:${process.env.SIMPLY_RETS_API_SECRET}`);

export const getProperty = async (req, res) => {
  try {
    const mlsSearch = req.query.search
    const formattedInput = _.replace(_.trim(mlsSearch), /\s+/g, '+');
    const response = await axios.get(`https://api.simplyrets.com/properties?q=${formattedInput}`, {
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
