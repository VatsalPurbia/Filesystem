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
const user_1 = require("../../Model/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = "" + req.headers.authorization;
    let decode;
    try {
        decode = jsonwebtoken_1.default.verify(token, 'secretKey1');
        const updatedUser = yield user_1.userSchema.update({
            username: req.body.username, first_name: req.body.first_name,
            last_name: req.body.last_name, email: req.body.email, Mob_number: req.body.Mob_number
        }, { where: { id: decode === null || decode === void 0 ? void 0 : decode.id } });
        JSON.parse(JSON.stringify(updatedUser));
        if (!updateUser) {
            res.status(404).json({ error: "user not found" });
        }
        else {
            res.status(201).json({ message: "User Updated" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
