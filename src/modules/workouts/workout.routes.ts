
import { Router } from "express";
import workoutController from "./workout.controller";
import authMiddleware from "../../middleware/auth.middleware";
const router = Router();

router.use(authMiddleware);

router.get("/", workoutController.listWorkouts);
router.get("/:id", workoutController.getWorkout);
router.post("/", workoutController.addWorkout);
router.patch("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);

export default router;