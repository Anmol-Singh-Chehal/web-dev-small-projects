import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Request, Response } from "express";
import userRouter from "../routes/userRoutes";
import postRouter from "../routes/postRoutes";


dotenv.config();
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api/", postRouter);

app.get("/", (req:Request, res:Response) => {
    res.send("This is prisma project.");
});

app.listen(PORT, () => {
    console.log(`Server is running on the http://localhost:${PORT}.`);
});