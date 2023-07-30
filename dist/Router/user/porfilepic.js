"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtverify_1 = require("../../middlewears/jwtverify");
const multerfileUpload_1 = require("../../middlewears/multerfileUpload");
const addpic_1 = require("../../Controllers/user/addpic");
const router = express_1.default.Router();
router.post('/profile_pic', jwtverify_1.sessionCheck, multerfileUpload_1.upload, addpic_1.addpic);
exports.default = router;
