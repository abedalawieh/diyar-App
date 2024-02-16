import { Sequelize } from "sequelize";
import logger from "./logger.config.js";

const connection = new Sequelize("deyar", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  logging: (msg) => logger.info(msg),
});
connection
  .sync()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("Error", error);
  });

export default connection;
