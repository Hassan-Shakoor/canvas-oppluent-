// ** Import Dependencies
import express  from "express";
import { getQRCode } from "../controllers/qrCodeGenerator.js";

const qrCodeGenerator = express.Router();

qrCodeGenerator.get('/', getQRCode)

export default qrCodeGenerator;