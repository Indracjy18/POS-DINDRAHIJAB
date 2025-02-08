import prisma from "../utils/client.js";
import {
  userValidation,
  userUpdateValidation,
} from "../validations/user.validation.js";
import { comparePassword, ecryptPassword } from "../utils/bcrypt.js";
import { logger } from "../utils/winston.js";
import {
  generateAccesToken,
  generateRefreshToken,
  parseJwt,
  verifyAksesToken,
} from "../utils/jwt.js";

export const createUser = async (req, res) => {
  const { error, value } = userValidation(req.body);

  // Jika validasi gagal, kembalikan error ke client
  if (error) {
    const errors = error.details.map((err) => err.message); // Kumpulkan semua pesan error
    return res.status(400).json({
      message: "Validation failed",
      errors,
      result: null,
    });
  }

  try {
    // Simpan data user ke database menggunakan Prisma
    const result = await prisma.user.create({
      data: {
        name: value.name,
        userName: value.userName,
        password: ecryptPassword(value.password),
        role: value.role,
      },
    });

    // Sembunyikan password dari response
    result.password = "xxxxxxxxxxxxxxx";

    return res.status(200).json({
      message: "success",
      result,
    });
  } catch (error) {
    logger.error("controllers/userController.js:createUser - " + error.message);
    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};

export const updateUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!user) {
    return res.status(404).json({
      message: "User tidak di temukan",
      result: null,
    });
  }
  //data validation
  const { error, value } = userUpdateValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      error: error.details[0].message,
      result: null,
    });
  }
  let password = user.password;
  if (value.password && value.password.length >= 0) {
    password = ecryptPassword(value.password);
  }
  try {
    const result = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: value.name,
        userName: value.userName,
        password: password,
        role: value.role,
      },
    });
    result.password = "xxxxxxxxxxxxxxx";
    return res.status(200).json({
      message: "success",
      result,
    });
  } catch (error) {
    logger.error("controllers/userController.js:updateUser - " + error.message);
    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        userName: req.body.userName,
      },
    });
    if (result) {
      if (comparePassword(req.body.password, result.password)) {
        //generate token
        result.password = "xxxxxxxxxxxxxxxxxxxxxx";
        const acessToken = generateAccesToken(result);
        const refreshToken = generateRefreshToken(result);
        return res.status(200).json({
          message: "Login Success",
          result,
          acessToken,
          refreshToken,
        });
      } else {
        return res.status(500).json({
          message: "Password not match",
        });
      }
    } else {
      return res.status(500).json({
        message: "User Not Found",
        result: null,
      });
    }
  } catch (error) {
    logger.error(
      "conntrollers/user.controller.js:loginUser - " + error.message
    );
    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    result.password = "xxxxxxxxxxxxxxxxxx";
    return res.status(200).json({
      message: "Delete Succes",
      result,
    });
  } catch (error) {
    logger.err("controllers/controller.js:delete - " + error.message);
    return res.status(500).json({
      message: error.message,
      return: null,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const result = await prisma.user.findMany({});
    return res.status(200).json({
      message: "Succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/user.controller.js:getAllUser - " + error.message
    );
    return res.status(500)({
      message: error.message,
      result: null,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Get User Succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/user.controller.js:getUserById - " + error.message
    );
    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};

export const setRefreshToken = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization header format",
        result: null,
      });
    }

    const token = authHeader.split(" ")[1];

    let verify;
    try {
      verify = verifyAksesToken(token);
    } catch (err) {
      return res.status(401).json({
        message: err.message,
        result: null,
      });
    }

    let data;
    try {
      data = await parseJwt(token);
    } catch (err) {
      return res.status(401).json({
        message: err.message,
        result: null,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        userName: data.userName,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        result: null,
      });
    }

    // Jangan kirim password ke client
    const userResponse = { ...user };
    delete userResponse.password;

    const accessToken = generateAccesToken(userResponse);
    const refreshToken = generateRefreshToken(userResponse);

    return res.status(200).json({
      message: "Success refresh token",
      result: userResponse,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error(
      "controllers/user.controller.js:setRefreshToken -" + error.message
    );
    return res.status(500).json({
      message: "Internal server error",
      result: null,
    });
  }
};
