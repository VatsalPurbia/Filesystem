import mongoose  from "mongoose";

const Schema = mongoose.Schema;


const commentesReplies  = new Schema ({
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User' 

    },
    replyText: {
        type : String, 
    },
    created_at : { 
        type : Date,
        default : Date.now
    }
})
export const comments = new Schema({
    post_id : { 
        type : Schema.Types.ObjectId,
        ref : 'posts'
    },
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    content : String,
    comments_replies : {
        type : commentesReplies
    }

    
})


export default comments