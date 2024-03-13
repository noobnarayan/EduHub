import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      throw new Error(401, "Invalid request");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      console.error("Error verifying token:", error);
      throw new Error(401, `Something went wrong: ${error}`);
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error(401, "Invalid Access Token");
    }

    return user;
  } catch (error) {
    throw new Error(401, `Something went wrong: ${error}`);
  }
};
