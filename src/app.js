import express from 'express';

import cors from "cors"
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin :process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"})) // ye data lega json me

app.use(express.urlencoded({extended:true,limit:"16kb"})) // url se jo bhi data hai in varient me usko samjh paye kahi pe space ko %20 se bhi jante hai kahi pe + se bhi to unsb ko samjhne ke liye hai ye

app.use(express.static("public")) // to ye hai ki for the time being chize hamre server pe store rahega


// to yaha pe jo cookie parser hai wo server se user ke browser ki cookie ko acsse and set kar skta hai uske liye hi hai bas
// koi bhi configuration karna hai to use `app.use()`

app.use(cookieParser());



export {app}