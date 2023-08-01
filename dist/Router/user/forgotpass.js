"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtverify_1 = require("../../middlewears/jwtverify");
const sendotp_1 = require("../../middlewears/sendotp");
const forgotPassword_1 = require("../../Controllers/user/forgotPassword");
const router = express_1.default.Router();
router.post(('/sendotp'), jwtverify_1.sessionCheck, sendotp_1.sendOtp);
router.post(('/forgotpass'), jwtverify_1.sessionCheck, forgotPassword_1.changePass);
exports.default = router;
