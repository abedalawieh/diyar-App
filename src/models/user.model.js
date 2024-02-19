import { Sequelize, DataTypes, Model } from "sequelize";
import connection from "../configs/db.config.js";

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please provide a valid email address",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "enabled",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 128],
          msg: "Please make sure that your password is between 6 and 128 characters long",
        },
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Users",
    timestamps: true,
  }
);

export default Users;
