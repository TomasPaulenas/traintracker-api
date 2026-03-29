import express from "express";
import cors from "cors";
import workoutRoutes from "./modules/workouts/workout.routes";
import authRoutes from "./modules/auth/auth.routes";
import exerxiseRoutes from "./modules/exercises/exercise.routes";
import exerciseTemplatesRoutes from "./modules/exerciseTemplates/exerciseTemplates.routes";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(
    cors({
        origin: allowedOrigins,
    })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        ok: true,
        message: "TrainTracker API running",
    });
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerxiseRoutes);
app.use("/api/exercise-templates", exerciseTemplatesRoutes)

export default app;