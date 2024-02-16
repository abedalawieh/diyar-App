import fastify from "fastify";
import dotenv from "dotenv";
import fastifyExpress from "@fastify/express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import fastifyFileUpload from "fastify-file-upload";
import createHttpError from "http-errors";

//DOTENV config
dotenv.config();

//Create fastify App
const app = fastify();
await app.register(fastifyExpress);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(helmet());
//enable cookie parser
app.use(cookieParser());
//gzip compression
app.use(compression());
//cors
app.use(cors({ origin: "http://localhost:3000" }));
//routes api v1
// app.use("/api/v1", routes);
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
