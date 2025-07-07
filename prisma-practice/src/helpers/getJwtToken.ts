import jwt from "jsonwebtoken";
import { appUser } from "../types/types";

const getJwtToken = (userId: string) => {
    const user:appUser = {userId: userId};
    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in .env file!");
    }
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1 day"});
}

export default getJwtToken;