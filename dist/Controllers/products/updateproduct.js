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
exports.updateProduct = void 0;
const Product_1 = require("../../Model/Product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = "" + req.headers.authorization;
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, 'secretKey1');
        const UpdatedData = yield Product_1.productSchema.update({
            porduct_name: req.body.product_name,
            description: req.body.description, basePrice: req.body.basePrice, title: req.body.title
        }, { where: { userId: decode === null || decode === void 0 ? void 0 : decode.id } });
        if (!UpdatedData) {
            res.status(400).json({ error: "Product not found" });
        }
        else {
            res.status(201).json({ message: "Product Updated successfully", UpdatedData });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateProduct = updateProduct;
