import { Sequelize, DataTypes, Model } from "sequelize";
import connection from "../configs/db.config.js";

class Apartments extends Model {}

Apartments.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Assuming images are stored as URLs
      allowNull: true,
      defaultValue: [],
    },
    price_details: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        address: null,
        city: null,
        area: null,
        county: null,
        state: null,
        zip: null,
        country: null,
        latitude: null,
        longitude: null,
      },
    },
    features: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    listing_details: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    sleeping_situation: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize: connection,
    modelName: "Apartments",
    timestamps: true,
  }
);

export default Apartments;
