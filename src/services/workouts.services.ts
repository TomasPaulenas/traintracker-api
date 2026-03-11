import { prisma } from "../lib/prisma"


const getAllWorkouts = async (userId: number) => {


    const workouts = await prisma.workout.findMany({
        where: {
            userId
        },

        include: {
            exercises: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return workouts;
}

const getWorkout = async (userId: number, int: number) => {

    const workout = await prisma.workout.findFirst({

        where: {
            id: int,
            userId: userId

        },


    });

    return workout;

}

const createWorkout = async (title: string, userId: number) => {



    const newWorkout = await prisma.workout.create({
        data: {

            title: title,
            userId: userId,


        }
    })

    return newWorkout;


}


const updateWorkout = async (userId: number, title: string | undefined, id: number) => {


    const dataToUpdate: { title?: string } = {};

    if (title !== undefined) {
        dataToUpdate.title = title;
    }

    if (Object.keys(dataToUpdate).length === 0) {
        return null;
    }

    const existingWorkout = await prisma.workout.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!existingWorkout) {
        return null;
    }

    const workoutUpdate = await prisma.workout.update({
        where: {
            id,
        },
        data: dataToUpdate,
    });

    return workoutUpdate;
};

const deleteWorkout = async (userId: number, id: number) => {
    const existingWorkout = await prisma.workout.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!existingWorkout) {
        return null;
    }

    const workout = await prisma.workout.delete({
        where: {
            id,
        },
    });

    return workout;
};






export default {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}