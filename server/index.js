// ** Import Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

// ** Import Routes
import pixabay from './routes/pixabay.js';

const app =  express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/searchPixabay',pixabay)

app.listen(process.env.PORT || 5000, () => {console.log("Server is Running at Port 5000.")})