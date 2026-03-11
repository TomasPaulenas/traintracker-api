
import workoutService from "../services/workouts.services";
import { Request, Response } from "express";
import { AuthRequest } from "../types/auth.types";

const listWorkouts = async (req: Request, res: Response) => {

    const userId = Number(req.userId);

    try {
        const workouts = await workoutService.getAllWorkouts(userId);
        return res.status(200).json(workouts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch workouts" })
    };


}

const getWorkout = async (req: Request, res: Response) => {

    const workoutId = Number(req.params.id);
    const userId = Number(req.userId);

    if (Number.isNaN(workoutId)) {
        return res.status(400).json({ message: "Invalid workout id" });
    }

    try {
        const workout = await workoutService.getWorkout(userId, workoutId);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        } else {
            return res.status(200).json(workout);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch workout" });
    }

}

const addWorkout = async (req: Request, res: Response) => {
    const { title } = req.body;
    const userId = req.userId;

    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "Invalid title" });
    }

    if (!userId) {
        return res.status(400).json({ message: "Invalid userId" });
    }
    try {
        const workout = await workoutService.createWorkout(title, userId);
        return res.status(201).json(workout);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error, please try again" });


    }
}

const updateWorkout = async (req: Request, res: Response) => {

    const { title } = req.body;
    const workoutId = Number(req.params.id);
    const userId = Number(req.userId);

    if (Number.isNaN(workoutId)) {
        return res.status(400).json({ message: "Invalid workout id" });
    }

    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
        return res.status(400).json({ message: "Invalid title" });
    }


    try {
        const workout = await workoutService.updateWorkout(userId, title, workoutId);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        return res.status(200).json(workout);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Invalid workout" });
    }

}

const deleteWorkout = async (req: Request, res: Response) => {

    const workoutId = Number(req.params.id);
    const userId = Number(req.userId);

    if (Number.isNaN(workoutId)) {
        return res.status(400).json({ message: "Invalid workout id" });
    }

    try {
        const workout = await workoutService.deleteWorkout(userId, workoutId);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        return res.status(200).json({ message: "Workout delete successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Invalid workout" });
    }





}





export default {
    listWorkouts,
    getWorkout,
    addWorkout,
    updateWorkout,
    deleteWorkout,


};
