"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const postRoutes_1 = __importDefault(require("../routes/postRoutes"));
dotenv_1.default.config();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api", userRoutes_1.default);
app.use("/api/", postRoutes_1.default);
app.get("/", (req, res) => {
    res.send("This is prisma project.");
});
app.listen(PORT, () => {
    console.log(`Server is running on the http://localhost:${PORT}.`);
});
