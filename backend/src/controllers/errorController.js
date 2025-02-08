import { verifyRefreshToken } from "../utils/jwt.js";

export const isAuth = (req, res, next) => {
  let lanjut = 1;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    lanjut = 0;
    return res.status(401).json({
      message: "Verify akses token failed",
      result: null,
    });
  }
  const user = verifyRefreshToken(token);
  if (!user) {
    lanjut = 0;
    return res.status(401).json({
      message: "Verify akses token failed",
      result: null,
    });
  }
  if (lanjut === 1) {
    next();
  }
};
