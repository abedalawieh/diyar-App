import { login } from "../../controllers/auth/login.controller.js";
export const loginRoute = async (app) => {
  app.route({
    method: "POST",
    url: "/login",
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            access_Token: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                email: { type: "string" },
                status: { type: "string" },
              },
            },
          },
        },
        "4xx": {
          type: "object",
          properties: {
            status: { type: "number" },
            message: { type: "string" },
          },
        },
        "5xx": {
          type: "object",
          properties: {
            status: { type: "number" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: login,
  });
};
