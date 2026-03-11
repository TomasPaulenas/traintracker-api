import authService from "../services/auth.service";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { TokenPayload } from "../types/auth.types";


const createUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const newUser = await authService.createUser(email, password);
        if (!newUser) {
            return res.status(400).json({ message: "Email already exists or invalid data" });
        }
        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error, please try again" });
    }


}

const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const loginUser = await authService.login(email, password)
        if (!loginUser) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        return res.status(200).json(loginUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error, please try again" })
    }



}

const getUser = async (req: Request, res: Response) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "no token provided" })
    }
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid authorization format" });
    }

    const token = parts[1];

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        const user = await authService.getUser(decoded.userId)

        if (!user) {
            return res.status(404).json({ message: "User not exist" })
        }
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid or expired token" })
    }




}














export default {
    createUser,
    login,
    getUser,
}