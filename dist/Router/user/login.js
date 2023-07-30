"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("../../Controllers/user/login");
const joivalidation_1 = require("../../middlewears/joivalidation");
const router = express_1.default.Router();
router.post('/login', joivalidation_1.loginValidator, login_1.login);
exports.default = router;
