import mongoose from 'mongoose';

// const cs = "mongodb://localhost:27017/coder"; 
const cs = 'mongodb+srv://agustinneuman:admin@cluster0.rx7dccp.mongodb.net/CoderHoFinal?retryWrites=true&w=majority&appName=Cluster0';

export const dbConnect = async () => {
  try {
    if (await mongoose.connect(cs)){
        console.log('connected to MongoDB');
    }    
  } catch (error) {
    console.log('error al conectarse al Mongo: ', error);
  }
};