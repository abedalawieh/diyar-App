import app from "./app.js";
import logger from "./configs/logger.config.js";
import connection from "./configs/db.config.js";
import Users from "./models/user.model.js";

const PORT = 3000;
let server = app.listen(PORT, () => {
  logger.info(`Server Listening on port ${PORT}`);
});
const exitHandler = () => {
  if (server) {
    logger.info("server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHnadler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHnadler);
process.on("unhandledRejection", unexpectedErrorHnadler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("server closed.");
    process.exit(1);
  }
});
