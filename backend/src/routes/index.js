import { Router } from "express";
import userRouter from "./userRoute.js";
// import categoryRoute from "./kategoriRoute.js";
const router = Router();

router.use("/api", userRouter);
// router.use("/api", categoryRoute);
router.use("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});

export default router;
