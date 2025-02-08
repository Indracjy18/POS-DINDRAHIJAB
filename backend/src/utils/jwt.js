// Import JsonWebToken library untuk mengelola token JWT
import JsonWebToken from "jsonwebtoken";
import "dotenv/config";

//*Fungsi untuk menghasilkan akses token
//* `user`: Data pengguna yang akan dimasukkan ke dalam token
//* Menggunakan metode `sign` dari JsonWebToken untuk membuat token
//* Token akan berisi data pengguna dan dienkripsi menggunakan `JWT_SECRET`
//* akses token dalam bentuk string
const generateAccesToken = (user) => {
  const payload = {
    userId: user.id,
    userName: user.userName,
    // hindari menyimpan data sensitif
  };

  return JsonWebToken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
    algorithm: "HS256", // specify algorithm
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  });
};

//*Fungsi untuk menghasilkan refresh token
//*user: data pengguna yang akan disimpan dalam token
const generateRefreshToken = (user) => {
  const payload = {
    userId: user.id,
    userName: user.userName,
    tokenType: "refresh",
  };

  return JsonWebToken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d", // lebih lama dari access token
    algorithm: "HS256",
  });
};
//* Fungsi untuk memverifikasi refresh token
//* token: token yang akan diverifikasi
//*Menggunakan metode `sign` dari JsonWebToken untuk membuat token
function verifyRefreshToken(token) {
  try {
    //* Verifikasi token menggunakan secret key
    return JsonWebToken.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return err;
  }
}

//*Fungsi untuk membaca payload dari token tanpa memverifikasi
//*token: token JWT yang akan di-parse
const parseJwt = (token) => {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (err) {
    throw new Error(`Invalid token format: ${err.message}`);
  }
};

//*Fungsi untuk memverifikasi akses token
//*token: token yang akan diverifikasi
const verifyAksesToken = (token) => {
  try {
    const verified = JsonWebToken.verify(token, process.env.JWT_SECRET);
    return verified;
  } catch (err) {
    if (err instanceof JsonWebToken.TokenExpiredError) {
      throw new Error("Token expired");
    } else if (err instanceof JsonWebToken.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw err;
  }
};

export {
  generateAccesToken,
  generateRefreshToken,
  verifyRefreshToken,
  parseJwt,
  verifyAksesToken,
};
