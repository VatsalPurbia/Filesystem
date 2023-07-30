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
exports.addpic = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../Model/user");
const addpic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.file, '-===-==-=--==--==---==--=');
        const token = "" + req.headers.authorization;
        console.log(token, '-------------_____TOIKEJDN_______________---------');
        const decoded = jsonwebtoken_1.default.verify(token, 'secretKey1');
        console.log(decoded, req.body.filename, '---------HERERERERERRERRRRRRRRRRRRR-----------------');
        const picture = fs_1.default.readFileSync(`./uploads/${req.body.filename}`);
        let data = user_1.userSchema.update({ profile: picture }, { where: { id: decoded.id } });
        res.status(200).json({ message: "successfully uploaded " });
        fs_1.default.unlink(`./uplaods/${req.body.filename}`, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log('File Deleted');
            }
        });
    }
    catch (error) {
        res.status(404).send(error);
    }
});
exports.addpic = addpic;
