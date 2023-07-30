"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = require("../../Controllers/signup");
const joivalidation_1 = require("../../middlewears/joivalidation");
const router = express_1.default.Router();
router.post('/signup', joivalidation_1.uservalidator, signup_1.signUpController);
exports.default = router;
