"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducts = void 0;
const Product_1 = require("../../Model/Product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const  {porduct_name , description , images , basePrice, title , userId } = req.body 
    const token = "" + req.headers.authorization;
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, 'secretKey1');
        console.log('');
        const newproduct = yield Product_1.productSchema.create({
            product_name: req.body.product_name,
            description: req.body.description,
            images: req.body.images,
            basePrice: req.body.basePrice,
            currentPrice: req.body.currentPrice,
            title: req.body.title,
            categorie: req.body.categorie,
            userId: decode === null || decode === void 0 ? void 0 : decode.id,
            bidderId: decode === null || decode === void 0 ? void 0 : decode.id
        });
        console.log("Product is Added Successfully");
        res.status(200).json({ message: "Product Added Successfully" });
        // res.redirect('/home')
    }
    catch (error) {
        throw error;
    }
});
exports.addProducts = addProducts;
