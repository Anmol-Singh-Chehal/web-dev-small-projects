import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appUser } from "../types/types";
import prisma from "../prisma";
import { User } from "../../generated/prisma";

declare module 'express' {
  interface Request {
    user?: User;
  }
}

const isLoggedIn = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const token = req.cookies.token;
        if(!token){
            throw new Error("You are not logged in.");
        }
        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is undefined.");
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as appUser;
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            }
        });

        if(!user){
            throw new Error("User not found.");
        }

        req.user = user;
        next();
        
    } catch(error:unknown){
        if(error instanceof Error){
            next(error);
        } else {
            next(new Error("Unknown error occurred."));
        }
    }
}

export default isLoggedIn;