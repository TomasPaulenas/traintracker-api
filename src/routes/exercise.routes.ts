import { Router } from "express";
import exerciseController from "../controllers/exercise.controller";
import authMiddleware from "../middleware/auth.middleware";
const router = Router();

router.use(authMiddleware);

router.post("/", exerciseController.createExercise);
router.get("/:id", exerciseController.getExercise);
router.get("/", exerciseController.listExercises)
router.delete("/:id", exerciseController.deleteExercise);
router.patch("/:id", exerciseController.updateExercise);


export default router;