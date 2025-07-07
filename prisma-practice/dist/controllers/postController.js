"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug, title, body, authorId } = req.body;
        if (!slug || !title || !body || !authorId) {
            throw new Error("Post credentials are missing.");
        }
        const postResult = yield prisma_1.default.post.create({
            data: {
                slug: slug,
                title: title,
                body: body,
                author: { connect: { id: authorId } },
            }
        });
        res.json(postResult);
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            next(new Error("Unknown error occurred."));
        }
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        const updatePostResult = yield prisma_1.default.post.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                body: body,
            }
        });
        res.json(updatePostResult);
    }
    catch (error) {
        res.json({ error: `Post with ${id} does not exists.` });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletePostResult = yield prisma_1.default.post.delete({
            where: {
                id: id,
            }
        });
        res.json(deletePostResult);
    }
    catch (error) {
        res.json({ error: `Post with ${id} does not exists.` });
    }
});
exports.deletePost = deletePost;
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsResult = yield prisma_1.default.post.findMany();
        res.json(postsResult);
    }
    catch (error) {
        res.json({ error: "Post not found." });
    }
});
exports.getAllPosts = getAllPosts;
