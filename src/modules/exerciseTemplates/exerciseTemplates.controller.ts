import exerciseTemplatesService from "./exerciseTemplates.service";
import { Request, Response } from "express";
import type { UpdateTemplateInput } from "./exerciseTemplates.types";



const getExerciseTemplates = async (req: Request, res: Response) => {

    try {
        const data = await exerciseTemplatesService.getAllExerciseTemplates();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }




}



const getTemplate = async (req: Request, res: Response) => {

    const templateId = Number(req.params.id);

    if (Number.isNaN(templateId)) {
        return res.status(400).json({ message: "Invalid template id" });
    }


    try {
        const data = await exerciseTemplatesService.getTemplateById(templateId)

        if (!data) {
            return res.status(404).json({ message: "Exercise template not found" });
        };
        return res.status(200).json(data);



    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }


}

const createTemplate = async (req: Request, res: Response) => {

    const { name, description } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        (description !== undefined && description !== null && typeof description !== "string")
    ) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const cleanDescription = description ?? null;
    const cleanName = name.trim();
    const data = { name: cleanName, description: cleanDescription };


    try {
        const template = await exerciseTemplatesService.createNewTemplate(data);
        return res.status(201).json(template);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "EXERCISE_TEMPLATE_NAME_ALREADY_EXISTS"
        ) {
            return res.status(409).json({
                message: "Exercise template name already exists",
            });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }

}

const updateTemplate = async (req: Request, res: Response) => {

    const templateId = Number(req.params.id);
    const { name, description } = req.body;

    if (name === undefined && description === undefined) {
        return res.status(400).json({ message: "No data provided to update" });
    }

    if (Number.isNaN(templateId)) {
        return res.status(400).json({ message: "Invalid template id" })
    }
    if (
        (name !== undefined && (typeof name !== "string" || name.trim() === "")) ||
        (description !== undefined && description !== null && typeof description !== "string")
    ) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const data: UpdateTemplateInput = {};

    if (name !== undefined) {
        data.name = name.trim();
    }

    if (description !== undefined) {
        data.description = description;
    }

    try {
        const template = await exerciseTemplatesService.updateTemplate(templateId, data)
        if (!template) {
            return res.status(404).json({ message: "Exercise template not found" });
        }
        return res.status(200).json(template);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}


const deleteTemplate = async (req: Request, res: Response) => {

    const templateId = Number(req.params.id);

    if (Number.isNaN(templateId)) {
        return res.status(400).json({ message: "Invalid template id" });
    }


    try {
        const deleted = await exerciseTemplatesService.deleteTemplate(templateId)
        if (!deleted) {
            return res.status(404).json({ message: "Exercise template not found" });
        }
        return res.status(200).json(deleted)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }


};


export default {
    getExerciseTemplates,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate
};
