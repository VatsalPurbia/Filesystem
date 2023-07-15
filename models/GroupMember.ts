import {  Model , DataTypes } from "sequelize";
import sequelize from "../connections";
import { Group } from "./Group"; 
import { User} from "./User";

export class GroupMember extends Model {
    public id!: number;
    public groupId!: number;
    public userId!: number;
  }
  
  GroupMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
          model : Group, 
          key : 'id'
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
          model : User, 
          key : 'id'
        }
      },
    },
    {
      sequelize,
      tableName: 'group_members',
    }
  );
  GroupMember.sync({force : false})