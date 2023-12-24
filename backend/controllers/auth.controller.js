import User from "./../models/User.js";
import { APIError } from "./../utils/ApiError.js";
import { APIResponse } from "./../utils/APIResponse.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new APIError(400, "User values are important");
  }
  const existingUser = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (existingUser) {
    throw new APIError(401, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return res.json(new APIResponse(200, user, "User created successfully"));
};

const login = async (req, res) => {
  // get all the values from the req
  // check whether all the values are present
  // get the user details from the DB using email
  // compare the passwords
  // generate the accessToken and refreshToken
  // send the both the tokens in the form of cookie response
};

export { register, login };
