import {  Model , DataTypes } from "sequelize";
import sequelize from "../connections";
import { User } from "./User";
import { Group } from "./Group";


export class Message extends Model {
    public id!: number;
    public text!: string;
    public userId!: number;
    public groupId!: number;
  }
  
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
       references : {
        model : User,
        key : 'id'
       }  
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
          model : Group,
          key : 'id'
          
        }
      },
    },
    {
      sequelize,
      tableName: 'messages',
    }
  );
  Message.sync({force : false})