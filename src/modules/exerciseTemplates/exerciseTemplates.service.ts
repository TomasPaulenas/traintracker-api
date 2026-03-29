import { prisma } from "../../lib/prisma";
import { CreateTemplateInput, UpdateTemplateInput } from "./exerciseTemplates.types";
import { Prisma } from "@prisma/client";



const getAllExerciseTemplates = async () => {

    const templates = await prisma.exerciseTemplate.findMany({

        orderBy: {
            name: "asc"
        },
    });

    return templates

}




const getTemplateById = async (templateId: number) => {

    const template = await prisma.exerciseTemplate.findUnique({

        where: {
            id: templateId,
        },



    });

    return template;

}

const createNewTemplate = async (data: CreateTemplateInput) => {


    try {
        const newTemplate = await prisma.exerciseTemplate.create({
            data,


        })

        return newTemplate;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new Error("EXERCISE_TEMPLATE_NAME_ALREADY_EXISTS");
        }
        throw error;

    }






};


const updateTemplate = async (templateId: number, data: UpdateTemplateInput) => {

    const existingTemplate = await prisma.exerciseTemplate.findUnique({
        where: {
            id: templateId,
        },

    })

    if (!existingTemplate) {
        return null;
    }

    const updatedTemplate = await prisma.exerciseTemplate.update({

        where: {
            id: templateId,
        },
        data

    })

    return updatedTemplate

}


const deleteTemplate = async (templateId: number) => {

    const existingTemplate = await prisma.exerciseTemplate.findUnique({
        where: {
            id: templateId,
        },

    })

    if (!existingTemplate) {
        return null;
    }

    const deleteTemplate = await prisma.exerciseTemplate.delete({
        where: {
            id: templateId,
        },

    })

    return deleteTemplate

}






export default {
    getAllExerciseTemplates,
    getTemplateById,
    createNewTemplate,
    updateTemplate,
    deleteTemplate
}
