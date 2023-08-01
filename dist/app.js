"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("./db/redis");
const updateproduct_1 = require("./Controllers/products/updateproduct");
const dotenv_1 = __importDefault(require("dotenv"));
// user 
const getallproducts_1 = require("./Controllers/products/getallproducts");
const porfilepic_1 = __importDefault(require("./Router/user/porfilepic"));
const login_1 = __importDefault(require("./Router/user/login"));
const signup_1 = __importDefault(require("./Router/user/signup"));
const addproducts_1 = require("./Controllers/products/addproducts");
const getUsreporducts_1 = require("./Controllers/products/getUsreporducts");
const forgotpass_1 = __importDefault(require("./Router/user/forgotpass"));
const addBid_1 = require("./Controllers/products/addBid");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
dotenv_1.default.config();
app.post('/updateProduct', updateproduct_1.updateProduct);
app.post('/addproduct', addproducts_1.addProducts);
app.get('/getproduct', getUsreporducts_1.getProduct);
app.post('/addbid', addBid_1.addbid);
app.get('/getallprod', getallproducts_1.getallProducts);
// app.post('/testapi' , testapi)
app.use('/user', porfilepic_1.default);
app.use('/user', forgotpass_1.default);
app.use('/user', signup_1.default);
app.use('/user', login_1.default);
app.listen(3000, () => {
    (0, redis_1.redisServer)();
    console.log('Server started on port 3000');
});
