import prisma from "../utils/client.js";
import { logger } from "../utils/winston.js";

import { categoryValidation } from "../validations/category.validation.js";

export const getAllCategory = async (req, res) => {
  try {
    const result = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json({
      message: "get all category succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/kategoriController.js:getAllCategori - " + error.message
    );
    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const result = await prisma.category.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json({
      message: "get category by id succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/kategoriController.js:getCategoryById - " + error.message
    );
    return res.status(500).json({
      message: error.message,
      result: null,
    });
  }
};

export const createCategory = async (req, res) => {
  const { error, value } = categoryValidation(req.body);
  if (error != null) {
    return res.status(500).json({
      message: error.detail[0].message,
      result: null,
    });
  }
  try {
    const result = await prisma.category.create({
      data: {
        data: {
          kategoryName: value.kategoryName,
        },
      },
    });
    return res.status(200).json({
      message: "create category succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/kategoriController.js:createCategory - " + error.message
    );
  }
};

export const updateCategory = async (req, res) => {
  const { error, value } = categoryValidation(req.body);
  if (!error != null) {
    return res.status(500).json({
      message: error.detail[0].message,
      result: null,
    });
  }
  try {
    const result = await prisma.category.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        kategoryName: value.kategoryName,
      },
    });
    return res.status(200).json({
      message: "update category succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/kategoriController.js:updateCategory - " + error.message
    );
    return res.status(500).json({
      message: "update category failed",
      result: null,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const result = await prisma.category.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).json({
      message: "delete category succes",
      result,
    });
  } catch (error) {
    logger.error(
      "controllers/kategoriController.js:deleteCategory - " + error.message
    );
    return res.status(500).json({
      message: "delete category failed",
      result: null,
    });
  }
};
