import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/kategoriController.js"; // Pastikan persis sama!

const categoryRoute = Router();

categoryRoute.get("/category", getAllCategory);
categoryRoute.get("/category/:id", getCategoryById);
categoryRoute.post("/category", createCategory);
categoryRoute.put("/category/:id", updateCategory);
categoryRoute.delete("/category/:id", deleteCategory);

export default categoryRoute;
