"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
exports.addressSchema = connection_1.default.define("address", {
    houseNumber: {
        type: sequelize_typescript_1.DataType.STRING
    },
    streetNumber: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    area: {
        type: sequelize_typescript_1.DataType.STRING
    },
    landMark: {
        type: sequelize_typescript_1.DataType.STRING
    },
    city: {
        type: sequelize_typescript_1.DataType.STRING
    },
    country: {
        type: sequelize_typescript_1.DataType.STRING
    },
    zipCode: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    state: {
        type: sequelize_typescript_1.DataType.STRING
    },
    userId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: user_1.userSchema,
            key: 'id'
        }
    }
});
