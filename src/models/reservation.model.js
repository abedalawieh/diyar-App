import { Sequelize, DataTypes, Model } from "sequelize";
import connection from "../configs/db.config.js";
import Users from "./user.model.js"; // Import the Users model
import Apartments from "./apartment.model.js"; // Import the Apartments model

class Reservations extends Model {}

Reservations.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Users, // Reference the Users table
        key: "id", // Reference the primary key in the Users table
      },
    },
    apartmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Apartments, // Reference the Apartments table
        key: "id", // Reference the primary key in the Apartments table
      },
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    reservation_fee: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        base_fee: 0,
        cleaning_fee: 0,
        // Add other reservation fee properties as needed
      },
    },
  },
  // Add other reservation-related attributes as needed
  {
    sequelize: connection,
    modelName: "Reservations",
    timestamps: true,
  }
);

export default Reservations;
