import express from "express";
import {createArticleTag, deleteArticleTag} from "../controllers/articleTag.controllers.js";
import { createaArticleTagValidation, deleteArticleTagValidation} from "../middlewares/validations/article.validation.js";
export const routerArticleTag = express.Router();

routerArticleTag.post("/articleTags", createaArticleTagValidation, createArticleTag);
routerArticleTag.delete("/articleTags/:id", deleteArticleTagValidation, deleteArticleTag);