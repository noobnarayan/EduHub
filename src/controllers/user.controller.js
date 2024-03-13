import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessAndRefereshTokens } from "../utils/generateAccessAndRefereshTokens.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  domain:
    process.env.NODE_ENV === "production"
      ? "noobnarayan.in"
      : "apollographql.com",
};

const createUser = asyncHandler(async (userData) => {
  const { name, email, password, role, courses } = userData;
  if (!name || !email || !password || !role || !courses) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }
  // Password is hashed in the User model before creating the user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role,
    courses,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return createdUser;
});

const loginUser = asyncHandler(async (context, userData) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  context.res.cookie("refreshToken", refreshToken, cookieOptions);
  context.res.cookie("accessToken", accessToken, cookieOptions);

  return {
    accessToken,
    refreshToken,
  };
});

export { createUser, loginUser };
