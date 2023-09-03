// ** Import Dependencies
import express  from "express";
import { getImages } from "../controllers/pixabay.js";

const pixabay = express.Router();

pixabay.get('/', getImages)

export default pixabay;