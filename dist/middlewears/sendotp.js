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
exports.sendOtp = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../Model/user");
const redis_1 = __importDefault(require("../db/redis"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
// Configure Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'vatsal.purbia@appinventiv.com',
        pass: 'ettenjxquydotqjl', // Replace with your email password
    },
});
// Helper function to generate a 6-digit OTP
function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
// Route for handling the "forgot password" request and sending OTP over email
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = "" + req.headers.authorization;
    let decode;
    decode = jsonwebtoken_1.default.verify(token, 'secretKey1');
    console.log(req.body.email);
    const user = yield user_1.userSchema.findOne({
        where: { email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.email }
    });
    JSON.parse(JSON.stringify(user));
    if (!user) {
        res.send(404).json({ error: "User not found" });
    }
    // TODO: Here, you should check if the email exists in your user database.
    // If it does, generate a unique token (e.g., using 'uuid' package) and store it with the user record.
    // For simplicity, I'll assume the token is already generated and stored in a 'resetToken' variable.
    else {
        // Generate OTP
        const OTP = generateOTP();
        const { email } = req.body;
        // Create the email
        const mailOptions = {
            from: 'vatsal.purbia@appinventiv.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Hello,\n\nYou have requested a password reset. Your OTP is: ${OTP}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe YourApp Team`,
        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Error sending email' });
            }
            else {
                console.log('Email sent:', info.response);
                redis_1.default.setEx(`OTP${decode.id}`, 900000, `${OTP}`); // TODO: Save the OTP and its expiration timestamp in the user's record in the database.
                console.log('herrerrrr----------------------------------------------------');
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    }
});
exports.sendOtp = sendOtp;
