import { Response, Request, NextFunction } from "express";
import { postInBody } from "../types/types";
import prisma from "../prisma";

export const createPost = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const { slug, title, body, authorId }:postInBody  = req.body;
        if(!slug || !title || !body || !authorId){
            throw new Error("Post credentials are missing.");
        }
        const postResult = await prisma.post.create({
            data: {
                slug: slug,
                title: title,
                body: body,
                author: {connect: {id: authorId}},
            }
        });
        res.json(postResult);
        
    } catch(error:unknown){
        if(error instanceof Error){
            next(error);
        } else {
            next(new Error("Unknown error occurred."));
        }
    }
}

export const updatePost = async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params;
    const {title, body} = req.body;
    try{
        const updatePostResult = await prisma.post.update({
            where: {
                id: id,
            }, 
            data: {
                title: title,
                body: body,
            }
        });
        res.json(updatePostResult);

    } catch(error:unknown){
        res.json({error: `Post with ${id} does not exists.`});
    }
}

export const deletePost = async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params;
    try{
        const deletePostResult = await prisma.post.delete({
            where: {
                id: id,
            }
        });
        res.json(deletePostResult);

    } catch(error:unknown){
        res.json({error: `Post with ${id} does not exists.`});
    }
}

export const getAllPosts = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const postsResult = await prisma.post.findMany();
        res.json(postsResult);
        
    } catch(error) {
        res.json({error: "Post not found."});
    }
}