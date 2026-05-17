import dotenv from 'dotenv';

dotenv.config({
path: '../.env'
});

import {DB_NAME} from "./constants.js";
import mongoose from 'mongoose';
import express from "express";
import connectDB from './db/index.js';

const app =express()



connectDB()












/*
(async() => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on("error", (error)=>{
        console.log("err: ", error)
        throw error
       })
       
       app.listen(process.env.PORT,()=>{
        console.log(`app is listing is at http://localhost:${process.env.PORT}`)
       })
    } catch (error) {
        console.error("error :", error)
        throw err
    }
})() 
*/