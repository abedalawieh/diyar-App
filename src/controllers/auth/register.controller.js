import { createUser } from "../../services/auth.service.js";
import { generateToken } from "../../services/token.service.js";
export const register = async (req, reply) => {
  try {
    const { name, email, status, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      status,
      password,
    });
    const access_Token = await generateToken(
      {
        userId: newUser.id,
      },
      "30d",
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log(access_Token);
    reply.send({
      message: "register success",
      access_Token: access_Token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        status: newUser.status,
      },
    });
  } catch (err) {
    reply
      .status(err.statusCode || 500)
      .send({ status: err.statusCode || 500, message: err.message });
  }
};
