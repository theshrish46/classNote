import User from "./../models/User.js";
import { APIError } from "./../utils/ApiError.js";
import { APIResponse } from "./../utils/APIResponse.js";

const generateAccessAndRefreshTokens = async function (_id) {
  try {
    const user = await User.findById(_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Something went wrong while generating tokens");
  }
};

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
  const { email, password } = req.body;
  if ([email, password].some((field) => field.trim == "")) {
    throw new APIError(400, "All the fields are important");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError(400, "User doesn't exists");
  }
  const isPasswordValid = user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new APIError("Unauthorized access check your passwords");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    // httpOnly: true,
    // secure: true,
  };
  return res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new APIResponse(
        200,
        { loggedUser, accessToken, refreshToken },
        "User logged successfully",
      ),
    );
};

export { register, login };
