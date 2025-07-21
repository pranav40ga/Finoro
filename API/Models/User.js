
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    notEmpty:true
  },
  email: {
    type: DataTypes.STRING,
        allowNull: false,
        unique: true,
         validate: {
      is: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, 
      notEmpty: true
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      len:[8,100],
    }
  },
  
    status:DataTypes.BOOLEAN,
},{  
  tableName:"users",
});

export default User;
