import express , {Request , Response } from "express"
import mongoose from "mongoose"
import { sessionModel } from "../Models/session"
import User from "../Models/User"
import jwt from "jsonwebtoken"


export const sessionInfo = async (req : Request, res :Response) => {   
      const token = ""+req.headers.authorization 
      let decoded : any 
    try {
             decoded = jwt.verify(token, 'secretKey') ;
             const userId = decoded._id;
   
      const sessions = await sessionModel.find({ userId }).populate("userId");
  
      res.json({ sessions });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }