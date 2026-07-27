import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const JWT_SECRET =
  process.env.JWT_SECRET || "default_super_secret_key";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
   console.log(req.headers.authorization);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export default authMiddleware;