import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

import { authRouter } from "./../routes/auth.router.js";
import { blogRouter } from "./../routes/blog.router.js";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/blog", blogRouter);

export { app };
