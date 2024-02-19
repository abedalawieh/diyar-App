// admins.model.js
import { Sequelize, DataTypes, Model } from "sequelize";
import connection from "../configs/db.config.js";

class Admins extends Model {}

Admins.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_type: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
    status: {
      type: DataTypes.STRING,

      defaultValue: "enabled",
    },
    // You can include other admin-related attributes as needed
  },
  {
    sequelize: connection,
    modelName: "Admins",
    timestamps: true,
  }
);

export default Admins;
