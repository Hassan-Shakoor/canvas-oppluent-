// ** Import Dependencies
import express from "express";
import { sendRegistrationEmailToUser } from '../controllers/sendRegistrationEmail.js';
import bodyParser from 'body-parser';

const sendRegistrationEmail = express.Router();

sendRegistrationEmail.post('/', sendRegistrationEmailToUser)

export default sendRegistrationEmail;