import { registerRoute } from "./register.route.js";
import { loginRoute } from "./login.route.js";
export default async function (app, opts) {
  await registerRoute(app);
  await loginRoute(app);

  // await anotherRoute(app);
}
