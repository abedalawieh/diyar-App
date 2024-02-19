import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";
import app from "../app.js";
import Users from "../models/user.model.js";
export const createUser = async (userData) => {
  const { name, email, status, password } = userData;
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }
  //check name length
  if (
    !(validator.isLength(name),
    {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please enter a name length between 6 and 16 caharacters"
    );
  }
  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      "Please enter a status less than 64 caharacters"
    );
  }
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please enter avalid email");
  }

  //check if user already exists
  const checkDb = await Users.findOne({ where: { email } });
  if (checkDb) {
    throw createHttpError.Conflict("This email is already taken");
  }

  //check password length
  if (!validator.isLength(password, { min: 6, max: 128 })) {
    throw createHttpError.BadRequest(
      "Please make sure that your password is between 6 and 128 characters "
    );
  }

  //hash password ----to be done at the user model
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // adding the user to  the database
  const user = await Users.create({
    name,
    email,
    status,
    password: hashedPassword,
  });
  return user;
};
export const loginUser = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }
  //check name length

  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please enter a valid email");
  }
  if (!validator.isLength(password, { min: 6, max: 128 })) {
    throw createHttpError.BadRequest(
      "Please make sure that your password is between 6 and 128 characters "
    );
  }
  //check if user already exists
  const checkDb = await Users.findOne({ where: { email } });
  if (!checkDb) {
    throw createHttpError.Conflict(
      "There is no user with this email address,please check you email and try again"
    );
  }
  console.log(checkDb.id);
  //check password length
};
