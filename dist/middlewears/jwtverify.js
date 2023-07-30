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
exports.sessionCheck = void 0;
const session_1 = require("../Model/session");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../db/redis");
const sequelize_1 = require("sequelize");
const sessionCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = "" + req.headers.authorization;
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, 'secretKey1');
        let redisresponse = yield redis_1.client.get(`${decoded.id}`);
        console.log(redisresponse, 'edddddddddddddddddddddddddddddddddddddddddddddddddddw');
        if (redisresponse == null) {
            console.log('miss');
            let isActiveSession = yield session_1.sessionSchema.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { userId: decoded === null || decoded === void 0 ? void 0 : decoded.id },
                        { isActive: true }
                    ]
                }
            });
            isActiveSession = JSON.parse(JSON.stringify(isActiveSession));
            if (isActiveSession) {
                redis_1.client.setEx(`${decoded.id}`, 3600, 'true');
            }
        }
        else {
            next();
            // res.send("Authentication Error ")
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.sessionCheck = sessionCheck;
