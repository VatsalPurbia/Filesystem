"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("./db/redis");
const forgotPassword_1 = require("./Controllers/user/forgotPassword");
const dotenv_1 = __importDefault(require("dotenv"));
// user 
const porfilepic_1 = __importDefault(require("./Router/user/porfilepic"));
const login_1 = __importDefault(require("./Router/user/login"));
const signup_1 = __importDefault(require("./Router/user/signup"));
const addproducts_1 = require("./Controllers/products/addproducts");
const getporducts_1 = require("./Controllers/products/getporducts");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
dotenv_1.default.config();
app.post('/addproduct', addproducts_1.addProducts);
app.get('/getproduct', getporducts_1.getProduct);
// app.post('/testapi' , testapi)
app.post('/forgotpass', forgotPassword_1.forgotPassword);
app.use('/user', porfilepic_1.default);
app.use('/user', signup_1.default);
app.use('/user', login_1.default);
app.listen(3000, () => {
    (0, redis_1.redisServer)();
    console.log('Server started on port 3000');
});
