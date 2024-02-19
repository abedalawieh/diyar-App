import fastify from "fastify";
import dotenv from "dotenv";
import fastifyExpress from "@fastify/express";
import fastifySensible from "fastify-sensible";

import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import routes from "./routes/auth/index.js";

//DOTENV config
dotenv.config();
//Create fastify App
const app = fastify();
await app.register(fastifyExpress);
app.register(fastifySensible); // Register fastify-sensible plugin

app.use(helmet());
//enable cookie parser
app.use(cookieParser());
//gzip compression
app.use(compression());
//cors
app.use(cors({ origin: "http://localhost:3000" }));

app.addHook("onError", (request, reply, error, done) => {
  console.error(error);
  reply.status(error.statusCode || 500).send({
    error: {
      status: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    },
  });
  done();
});
//routes api v1

await app.register(routes, { prefix: "/api/v1/auth" });

export default app;
// app.use(async (req, res, next) => {
//   next(createHttpError.NotFound("This route does not exist"));
// });
