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
exports.forgotPassword = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_1 = require("../../Model/user");
const app = (0, express_1.default)();
// Configure Nodemailer
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'monserrat.gleichner39@ethereal.email',
        pass: 'sSVX1aVjAUzFssAuTM', // Replace with your email password
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
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        // Create the email
        const mailOptions = {
            from: 'monserrat.gleichner39@ethereal.email',
            to: " monserrat.gleichner39@ethereal.email",
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
                // TODO: Save the OTP and its expiration timestamp in the user's record in the database.
                return res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    }
});
exports.forgotPassword = forgotPassword;
// Route for handling password reset with OTP verification
// app.post('/reset-password/:token', (req: Request, res: Response) =>{
// const { token } = req.params;
//   const { otp, newPassword } = req.body;
//   // TODO: Here, you should look up the user in your database based on the provided token.
//   // Then, check if the OTP provided by the user matches the one stored in the database.
//   // If the OTP is valid, update the user's password with the new one.
//   // For simplicity, I'll assume the token and OTP are already validated, and the password is updated.
//   // Send a response indicating the password has been reset.
//   res.status(200).json({ message: 'Password reset successful' });
// });
