import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
import dotenv from 'dotenv';

dotenv.config({
path: '../../.env'
});

const connectDB = async () =>{
    try{
      const conectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log("conection succefully" ,conectioninstance.connection.host)
    }catch(err){
        console.log("mongo db conection err" , err)
        process.exit(1);
    }
}

export default connectDB