import axios from 'axios'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

export const getImages = async(req,res) => {
        try{
            const search = req.query.search;
            const apiKey = process.env.PIXABAY_API_KEY;
            const url = `https://pixabay.com/api/?key=${apiKey}&q=${search}&image_type=photo`
            const response = await axios.get(url)
            const data = response.data
            res.json(data)
        }catch (error) {
            res
              .status(500)
              .json({error: 'An error occurred while fetching data from Pixabay.'});
          }
}