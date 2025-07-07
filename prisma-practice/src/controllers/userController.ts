import prisma from "../prisma";
import cookieToken from "../utils/cookieToken";
import { Response, Request, NextFunction } from "express";

export const signUp = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const { name, email, password } = await req.body;

        if(!name || !email || !password){
            throw new Error("Please provide all credentials.");
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            }
        });
        cookieToken(user, res);
        
    } catch(error:unknown){
        if(error instanceof Error){
            next(error);
        } else {
            next(new Error("Unknown error occurred."));
        }
    }
}

export const logIn = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const { email, password } = await req.body;
        if(email){
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });

            if(user){
                if(user.password === password){
                    cookieToken(user, res);
                } else {
                    throw new Error("Password is incorrect.");
                }
                
            } else {
                throw new Error("User not found in database.");
            }

        } else {
            throw new Error("Please provide email and password.");
        }

    } catch(error:unknown){
        if(error instanceof Error){
            next(error);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}

export const logOut = (req:Request, res:Response, next:NextFunction) => {
    try{
        res.clearCookie("token");
        res.json({ success: true });
    } catch(error:unknown){
        if(error instanceof Error){
            next(error);
        } else {
            throw new Error("Unknown error occurred.");
        }
    }
}
