import { Router } from "express";
import authController from "./auth.controller";
import authMiddleware from "../../middleware/auth.middleware";
const router = Router();



router.post("/register", authController.createUser);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getUser);

export default router;