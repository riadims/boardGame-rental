// middleware/authMiddleware.js
// Express middleware for protecting routes using JWT authentication.
// Verifies the token, attaches the user to the request, and handles authorization errors.

import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to protect routes by requiring a valid JWT token.
 * - Checks for the Authorization header and verifies the token.
 * - Attaches the authenticated user (without password) to req.user.
 * - Responds with 401 if the token is missing or invalid.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (without password) to request
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token was found
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
export default protect;