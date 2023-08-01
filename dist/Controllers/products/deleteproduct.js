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
exports.deleteProduct = void 0;
const Product_1 = require("../../Model/Product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = "" + req.headers.authorization;
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, 'secretKey1');
        const data = yield Product_1.productSchema.findOne({ where: { userId: decode === null || decode === void 0 ? void 0 : decode.id } });
        JSON.parse(JSON.stringify(data));
        if (data) {
            yield data.destroy();
            res.status(200).json({ message: "Deleted product successfully " });
        }
        else {
            res.status(404).json({ error: "Product not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "An error occured while fetching the prodcut data  " });
    }
});
exports.deleteProduct = deleteProduct;
