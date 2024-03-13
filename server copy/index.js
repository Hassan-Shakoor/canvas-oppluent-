// ** Import Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

// ** Import Routes
import pixabay from './routes/pixabay.js';
import qrCodeGenerator from './routes/qrCodeGenerator.js';
import mls from './routes/mls.js';
import sendRegistrationEmail from './routes/sendRegistrationEmail.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/searchPixabay', pixabay)
app.use('/generateQR', qrCodeGenerator)
app.use('/mlsSearch', mls)
app.use('/send-registeration-mail', sendRegistrationEmail)

app.listen(process.env.PORT || 5000, () => { console.log("Server is Running at Port 5000.") })