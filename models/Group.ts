import {  Model , DataTypes } from "sequelize";
import sequelize from "../connections";


export class Group extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
  }
  
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'groups',
    }
  );
  Group.sync({force : false})