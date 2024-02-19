import { register } from "../../controllers/auth/register.controller.js";
export const registerRoute = async (app) => {
  app.route({
    method: "POST",
    url: "/register",
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          status: { type: "string" },
          password: { type: "string" },
        },
        required: ["name", "email", "password"],
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
    handler: register,
  });
};
