import { DataType } from "sequelize-typescript";
import sequlizeDB from '../db/connection'


export const sessionSchema=sequlizeDB.define("session",{
    userId:{
        type:DataType.INTEGER
    },
    isActive:{
        type:DataType.BOOLEAN
    }
})