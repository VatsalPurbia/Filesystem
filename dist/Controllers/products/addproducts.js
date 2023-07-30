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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducts = void 0;
const Product_1 = require("../../Model/Product");
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const  {porduct_name , description , images , basePrice, title , userId } = req.body 
    try {
        const newproduct = yield Product_1.productSchema.create({
            porduct_name: req.body.porduct_name,
            description: req.body.description,
            images: req.body.images,
            basePrice: req.body.basePrice,
            title: req.body.title,
            userId: req.body.userId
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
