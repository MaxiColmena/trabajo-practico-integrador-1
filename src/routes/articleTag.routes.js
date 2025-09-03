import express from "express";
import {createArticleTag, getAllArticleTag, getArticleTagById, updateArticleTag, deleteArticleTag} from "../controllers/articleTag.controllers.js";
export const routerArticleTag = express.Router();

routerArticleTag.post("/articleTags", createArticleTag);
routerArticleTag.get("/articleTags", getAllArticleTag);
routerArticleTag.get("/articleTags/:id", getArticleTagById);
routerArticleTag.put("/articleTags/:id", updateArticleTag);
routerArticleTag.delete("/articleTags/:id", deleteArticleTag);