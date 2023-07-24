import mongoose, { Document , mongo } from "mongoose"


const Schema = mongoose.Schema 

interface User extends Document {
  username : string , 
  password : string , 
  email : string , 
  privateAccount : boolean,
  followers : mongoose.Schema.Types.ObjectId,
  following : mongoose.Schema.Types.ObjectId,  
  favorites: {
      userId : mongoose.Schema.Types.ObjectId,
      postId : mongoose.Schema.Types.ObjectId,
  }
  address : {
    street : string ,
    city : string ,
    state : string ,
    country : string ,
    zipcode : string
  }
  
}


const addressSchema = new Schema({
    street: String,
    city : String, 
    state : String,
    country : String,
    zipCode : String 

})
export const userSchema = new mongoose.Schema<User>({
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
  

export default mongoose.model<User>('User' , userSchema);