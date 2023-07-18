import mongoose  from "mongoose";
import User from "./User";
const Schema = mongoose.Schema

export const sessionSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '7d' // Automatically delete expired sessions after 7 days
    }
  });


export default sessionSchema