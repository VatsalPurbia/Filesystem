import mongoose from "mongoose";
import express from "express"
import {db} from './DataBase/database'
import User from './Models/User'
import posts from './Models/posts'
import comments from './Models/comments'
import likes from './Models/likes'
import session from './Models/session'
import siningroute from './Router/singin'
import loginroute from './Router/login'
import jwt from 'jsonwebtoken'
const app = express()
const router = express.Router()


// User.createCollection().then(function (collection) {
//     console.log('Collection is created!');
// });
// posts.createCollection().then(function(collection){
//     console.log('Collection is created');
    
// })
// likes.createCollection().then(function(collection){
//     console.log('Collection is created');
    
// })
// comments.createCollection().then(function(collection){
//     console.log('Collection is created');
    
// })
// session.createCollection().then(function(collection){
//     console.log('Collection is created');
    
// })
app.use(express.json())

app.use("/auth",siningroute)
app.use("/auth", loginroute)

// app.use()

app.listen(3000 , () =>{
    db();
    console.log('server started on port 3000')
})

