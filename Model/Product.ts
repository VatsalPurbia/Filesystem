import { DataType, Model } from "sequelize-typescript";
import sequelizedb from "../db/connection";
import { userSchema } from "./user";

export const productSchema = sequelizedb.define('products',{  
    product_name : {
        type : DataType.STRING
    },
    description :{
        type : DataType.STRING
    },
    images : {
        type : DataType.BLOB("long")
    },
    basePrice : {
        type : DataType.INTEGER
    },
    title : {
        type : DataType.STRING
    },
    userId :  {
        type : DataType.INTEGER,
        allowNull : false , 
        references : {
            model : userSchema,
            key : 'id'

        }       
    }


})