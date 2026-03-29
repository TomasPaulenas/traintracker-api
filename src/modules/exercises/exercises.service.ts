import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CreateExerciseData } from "./exercise.types";
import { UpdateExerciseData } from "./exercise.types";





const getAllExercises = async (userId: number) => {



    const exercises = await prisma.exercise.findMany({

        where: {
            workout: {
                userId
            }
        },
        orderBy: {
            createdAt: "desc"
        }

    });

    return exercises;
}


const createExercise = async (userId: number, data: CreateExerciseData) => {


    const workout = await prisma.workout.findFirst({
        where: {
            id: data.workoutId,
            userId,
        },
    });

    if (!workout) {
        return null;
    }

    const newExercise = await prisma.exercise.create({
        data,
    });

    return newExercise;
}

const getExercise = async (userId: number, exerciseId: number) => {

    const exercise = await prisma.exercise.findFirst({
        where: {
            id: exerciseId,
            workout: {
                userId
            }
        },

    });

    return exercise;

}


const updateExercise = async (userId: number, exerciseId: number, data: UpdateExerciseData) => {


    const existingExercise = await prisma.exercise.findFirst({
        where: {
            id: exerciseId,
            workout: {
                userId,
            },
        },
    });

    if (!existingExercise) {
        return null;
    }

    const updatedExercise = await prisma.exercise.update({
        where: {
            id: exerciseId,
        },
        data,
    });

    return updatedExercise;
}

const deleteExercise = async (userId: number, exerciseId: number) => {
    const existingExercise = await prisma.exercise.findFirst({
        where: {
            id: exerciseId,
            workout: {
                userId,
            },
        },
    });

    if (!existingExercise) {
        return null;
    }

    const deletedExercise = await prisma.exercise.delete({
        where: {
            id: exerciseId,
        },
    });

    return deletedExercise;
}



export default {
    createExercise,
    getExercise,
    deleteExercise,
    getAllExercises,
    updateExercise
}
