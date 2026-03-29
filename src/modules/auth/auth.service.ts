import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";



const createUser = async (email: string, password: string) => {



    if (!email || !password) {
        return null;
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return null;
    }



    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email,
            passwordHash,
        }
    })
    return {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt,
    };

}

const login = async (email: string, password: string) => {


    if (!email || !password) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { email },


    })

    if (!user) {
        return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
        return null
    }

    const token = Jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    )


    return {
        token,
        user:
        {
            id: user.id,
            email: user.email
        }

    };


}


const getUser = async (userId: number) => {

    const existingUser = await prisma.user.findUnique({
        where: { id: userId },
    })

    if (!existingUser) {
        return null;
    }

    return {
        id: existingUser.id,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
    };


}












export default {
    createUser,
    login,
    getUser,

}