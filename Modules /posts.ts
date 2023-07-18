import mongoose from "mongoose";
import userSchema from "./User";
const Schema = mongoose.Schema
export const posts = new Schema ({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    content : String ,
    comments : {
        type : Schema.Types.ObjectId,
        ref : 'commnets'
    },
    imageUrl : String , 
    caption : String, 
    createdAe : {
        type : Date,
        default : Date.now
    }
})

export default posts