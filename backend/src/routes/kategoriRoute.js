import { Router } from "express";
import { getAllCategory } from "../controllers/kategoriController";

const categoryRouter = Router();

categoryRouter.use("/category", getAllCategory);

export default categoryRouter;
