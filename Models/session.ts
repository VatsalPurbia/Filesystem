import mongoose , { Document } from "mongoose";
import User from "./User";
import { boolean } from "joi";

interface sessionSchema extends Document {
  userId : mongoose.Schema.Types.ObjectId,
  isActive : boolean 
  createdAt : Date,
  user : mongoose.Schema.Types.ObjectId
}
const Schema = mongoose.Schema

export const sessionSchema = new Schema<sessionSchema>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isActive: {
      type : Boolean
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '7d' // Automatically delete expired sessions after 7 days
    },
    user: {
      type : mongoose.Schema.ObjectId,
      ref : 'User'
    }
  })

export const sessionModel=mongoose.model<sessionSchema>("session" , sessionSchema ) 