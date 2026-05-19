import dotenv from 'dotenv';

dotenv.config({
path: '../.env'
});

import {DB_NAME} from "./constants.js";
import mongoose from 'mongoose';
import express from "express";
import connectDB from './db/index.js';

const app =express()



connectDB() // ye ek function hai jo promise return karega means ham ispe .then() ya async await use kar sakte hai
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`app is listing is at http://localhost:${process.env.PORT}`)
       })
})
.catch((err) =>{
    console.log("err aa gya sir ji",err)
})













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