import mongoose, { Document, mongo } from "mongoose";
import userSchema from "./User";
const Schema = mongoose.Schema

interface postsSchema extends Document {
    user: mongoose.Schema.Types.ObjectId,
    content: string,
    caption: string

}
export const postsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('posts', postsSchema)