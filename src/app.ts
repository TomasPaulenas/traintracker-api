import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workouts.routes";
import authRoutes from "./routes/auth.routes";
import exerxiseRoutes from "./routes/exercise.routes";

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

export default app;