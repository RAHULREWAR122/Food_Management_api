
import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECT_DB);

export const db =  mongoose.connection;
db.on('error' , console.error.bind('error inconnect db'));

db.once('open' ,()=>{
    console.log("mongoDB connected Successfully");

})
