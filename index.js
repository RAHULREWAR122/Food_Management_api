import express from 'express';
import router from './Routes/route.js';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

import { db } from './Mongoose/mongoose.js';
const port = 3100
const app = express();


app.use(cors());
app.use(express.json())
app.use(router);


app.listen(port , ()=>{
    console.log(`server running successfully on port http://localhost:${port}`)
})
