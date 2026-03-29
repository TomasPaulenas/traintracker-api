import { Router } from "express";
import exerciseTemplatesController from "./exerciseTemplates.controller";
import authMiddleware from "../../middleware/auth.middleware";
const router = Router();

router.use(authMiddleware)

router.get("/", exerciseTemplatesController.getExerciseTemplates)
router.get("/:id", exerciseTemplatesController.getTemplate)
router.post("/", exerciseTemplatesController.createTemplate)
router.patch("/:id", exerciseTemplatesController.updateTemplate)
router.delete("/:id", exerciseTemplatesController.deleteTemplate)


export default router;