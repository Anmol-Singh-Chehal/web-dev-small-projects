import getJwtToken from "../helpers/getJwtToken";
import { Response } from "express";
import { User } from "../../generated/prisma";

const cookieToken = (user:User, res:Response) => {
    if(user){
        const token = getJwtToken(user.id);
        const options = {
            expires: new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000,
            ),
            httpOnly: true,
        }
        user.password = "";
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        });
    }
}

export default cookieToken;