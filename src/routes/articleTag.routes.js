import express from "express";
import {createArticleTag, deleteArticleTag} from "../controllers/articleTag.controllers.js";
export const routerArticleTag = express.Router();

routerArticleTag.post("/articleTags", createArticleTag);
routerArticleTag.delete("/articleTags/:id", deleteArticleTag);