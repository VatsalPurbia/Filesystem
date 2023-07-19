import mongoose from "mongoose";
import express from "express"
import {db} from './Provider/database'

const app = express()







app.listen(3000 , () =>{
    db();
    console.log('server started on port 3000')
})