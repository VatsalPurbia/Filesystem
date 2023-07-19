import mongoose from "mongoose";
import User from "./User";
import posts from "./posts";
import { ExplainVerbosity } from "mongodb";

const Schema = mongoose.Schema;

export const likesSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    posts_id: {
        type: Schema.Types.ObjectId,
        ref: 'posts '


    }
})

export default mongoose.model('likes' , likesSchema)