import { loginUser } from "../../services/auth.service.js";
import { generateToken } from "../../services/token.service.js";
export const login = async (req, reply) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser({
      email,
      password,
    });
    const access_Token = await generateToken(
      {
        userId: user.id,
      },
      "30d",
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log(access_Token);
    reply.send({
      message: "Login success",
      access_Token: access_Token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (err) {
    reply
      .status(err.statusCode || 500)
      .send({ status: err.statusCode || 500, message: err.message });
  }
};
