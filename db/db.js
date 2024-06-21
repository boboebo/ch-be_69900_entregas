import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const cs = process.env.MONGODB_CONNECTION_STRING;;

export const dbConnect = async () => {
  try {
    if (await mongoose.connect(cs)){
        console.log('connected to MongoDB');
    }    
  } catch (error) {
    console.log('error al conectarse al Mongo: ', error);
  }
};