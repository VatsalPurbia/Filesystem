import mongoose from "mongoose"


const Schema = mongoose.Schema 


const addressSchema = new Schema({
    street: String,
    city : String, 
    state : String,
    country : String,
    zipCode : String 

})
export const User = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    privateAccount: {
      type: Boolean,
      default: false
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    favorites: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    }],
    address : addressSchema
  });
  

export default User;