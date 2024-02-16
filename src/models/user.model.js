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
    },
  },
  {
    sequelize: connection,
    modelName: "Users",
    timestamps: true,
  }
);

export default Users;
