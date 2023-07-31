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
exports.login = void 0;
const user_1 = require("../Model/user");
const redis_1 = __importDefault(require("../db/redis"));
const session_1 = require("../Model/session");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let token = "";
    // const {username , password } = req.body
    let data = yield user_1.userSchema.findOne({
        where: {
            [sequelize_1.Op.and]: [
                { username: (_a = req.body) === null || _a === void 0 ? void 0 : _a.username },
                { password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password }
            ]
        }
    });
    console.log(data);
    let userdata = JSON.parse(JSON.stringify(data));
    token = jsonwebtoken_1.default.sign({ id: userdata.id }, 'secretKey1', { expiresIn: '1h' });
    if (userdata) {
        let redisresponse = yield redis_1.default.get(`${userdata.id}`);
        console.log(redisresponse);
        if (redisresponse == null) {
            console.log('miss');
            let isActiveSession = yield session_1.sessionSchema.findOne({
                where: {
                    [sequelize_1.Op.and]: [
                        { userId: userdata.id },
                        { isActive: true }
                    ]
                }
            });
            if (JSON.parse(JSON.stringify(isActiveSession)) == null) {
                session_1.sessionSchema.create({
                    userId: userdata.id,
                    isActive: true
                });
                redis_1.default.setEx(`${userdata.id}`, 3500, 'true');
            }
            else {
                redis_1.default.setEx(`${userdata.id}`, 3500, 'true');
            }
            res.status(201).send(token);
        }
        else {
            console.log('cache hit');
            res.status(201).send(token);
        }
    }
    else {
        return res.status(401).json({ error: "Please register yourself first " });
    }
});
exports.login = login;
