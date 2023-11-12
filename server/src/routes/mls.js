// ** Import Dependencies
import express  from "express";
import { getProperty } from "../controllers/mls.js";

const mls = express.Router();

mls.get('/', getProperty)

export default mls;