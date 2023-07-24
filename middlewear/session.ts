import express , {  Response , Request } from "express";
import mongoose from "mongoose";
import { sessionModel } from "../Models/session";
import jwt from "jsonwebtoken";
import Redis from 'redis'
import { captureRejectionSymbol } from "events";

export const sessionCheck =async (req: Request , res : Response , next : () => void) => {
    
    const token = ""+req.headers.authorization
  
    let decoded: any 

    try { 
        decoded = jwt.verify(token , 'secretKey')
   
    } 
    catch {
        res.status(401).json({error : 'token not valid'})

 }
        try{
            let data = await sessionModel.find({
                userId : decoded._id,
                isActive : true 
            })
            data.length>0?next():res.send("aunthentication error")
        }
        catch (error) {
            res.send(error)

        }

    
}


