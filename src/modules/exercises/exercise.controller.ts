
import { Request, Response } from "express";
import exercisesService from "./exercises.service";



const createExercise = async (req: Request, res: Response) => {

    const { name, notes, workoutId, sets, reps, weight } = req.body;
    const data = { name, notes, workoutId, sets, reps, weight };
    const userId = Number(req.userId);


    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof workoutId !== "number" ||
        typeof sets !== "number"
    ) {
        return res.status(400).json({ message: "Invalid values" });
    }

    try {
        const newExercise = await exercisesService.createExercise(userId, data)
        if (!newExercise) {

            return res.status(404).json({ message: "Workout not found" })
        }
        return res.status(201).json(newExercise);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create exercise" })
    }




}

const getExercise = async (req: Request, res: Response) => {

    const exerciseId = Number(req.params.id);
    const userId = Number(req.userId);

    if (Number.isNaN(exerciseId)) {
        return res.status(400).json({ message: "Invalid exercise id" });
    }

    try {
        const exercise = await exercisesService.getExercise(userId, exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        } else {
            return res.status(200).json(exercise);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch exercise" });
    }

}


const deleteExercise = async (req: Request, res: Response) => {

    const exerciseId = Number(req.params.id);
    const userId = Number(req.userId);

    if (Number.isNaN(exerciseId)) {
        return res.status(400).json({ message: "Invalid exercise id" });
    }

    try {
        const exercise = await exercisesService.deleteExercise(userId, exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }
        return res.status(200).json({ message: "Exercise deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete exercise" });
    }





}

const listExercises = async (req: Request, res: Response) => {

    const userId = Number(req.userId);

    try {
        const exercises = await exercisesService.getAllExercises(userId);
        return res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch exercises" })
    };


}

const updateExercise = async (req: Request, res: Response) => {
    const exerciseId = Number(req.params.id);
    const { name, notes, sets, reps, weight } = req.body;
    const userId = Number(req.userId);

    if (Number.isNaN(exerciseId)) {
        return res.status(400).json({ message: "Invalid exercise id" });
    }

    if (
        name === undefined &&
        notes === undefined &&
        sets === undefined &&
        reps === undefined &&
        weight === undefined
    ) {
        return res.status(400).json({ message: "No data provided to update" });
    }

    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
        return res.status(400).json({ message: "Invalid name" });
    }

    const data = { name, notes, sets, reps, weight };

    try {
        const exercise = await exercisesService.updateExercise(userId, exerciseId, data);

        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        return res.status(200).json(exercise);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update exercise" });
    }
};






export default {
    createExercise,
    getExercise,
    deleteExercise,
    listExercises,
    updateExercise,
};