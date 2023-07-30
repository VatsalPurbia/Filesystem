"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
exports.productSchema = connection_1.default.define('products', {
    product_name: {
        type: sequelize_typescript_1.DataType.STRING
    },
    description: {
        type: sequelize_typescript_1.DataType.STRING
    },
    images: {
        type: sequelize_typescript_1.DataType.BLOB("long")
    },
    basePrice: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    title: {
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
