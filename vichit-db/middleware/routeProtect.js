import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/constants";

export function routeProtect(req, res, next) {
  try {
    const token = req.headers?.authorization;
    if (!token) throw new Error();
    const decode = jwt.verify(token, JWT_KEY);
    req.userData = decode;
    next();
  } catch {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
}
