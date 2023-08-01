"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
// interface ProductInstance extends Model {
//     product_name: string;
//     description: string;
//     images : Blob;
//     basePrice : number;
//     title : string;
//     // Add other properties here based on your model definition
//   }
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
    currentPrice: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    title: {
        type: sequelize_typescript_1.DataType.STRING
    },
    categorie: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: user_1.userSchema,
            key: 'id'
        }
    },
    bidderId: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: user_1.userSchema,
            key: 'id'
        }
    }
});
