import express from "express";

import { write } from "./../controllers/blog.controller.js";

const blogRouter = express.Router();

blogRouter.post("/write", write);

export { blogRouter };
