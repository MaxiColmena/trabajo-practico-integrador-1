import express from "express";
import {createArticleTag, deleteArticleTag} from "../controllers/articleTag.controllers.js";
import { createaArticleTagValidation, deleteArticleTagValidation} from "../middlewares/validations/article_tag.validation.js";
import { aplicateValidation } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authorMiddleware } from "../middlewares/owner.js";

export const routerArticleTag = express.Router();

routerArticleTag.post("/articleTags", authMiddleware, authorMiddleware, createaArticleTagValidation, aplicateValidation, createArticleTag);

routerArticleTag.delete("/articleTags/:id", authMiddleware, authorMiddleware, deleteArticleTagValidation, aplicateValidation, deleteArticleTag);