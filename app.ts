import express, { Response, Request } from 'express';
import { Sequelize, Op, Model, DataTypes } from "sequelize"
import { redisServer } from './db/redis';
import { forgotPassword } from './Controllers/user/forgotPassword';
import { testapi } from './Controllers/testapi';

import dotenv from 'dotenv'
// user 
import addProfilePic from './Router/user/porfilepic'
import login from './Router/user/login'
import signup from './Router/user/signup'
import { addProducts } from './Controllers/products/addproducts';
import { getProduct } from './Controllers/products/getporducts';
const app = express();

const port=process.env.PORT;
app.use(express.json())
dotenv.config();
app.post('/addproduct' ,addProducts)
app.get('/getproduct', getProduct)
// app.post('/testapi' , testapi)
app.post('/forgotpass' , forgotPassword)
app.use('/user' , addProfilePic)
app.use('/user' , signup)
app.use('/user' , login )

app.listen(3000, () => {
    redisServer();
    console.log('Server started on port 3000');
});


