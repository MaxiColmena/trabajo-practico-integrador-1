import express from "express";
import {createArticle, getAllArticle, getArticleById, updateArticle, deleteArticle} from "../controllers/article.controllers.js";
export const routerArticle = express.Router();

routerArticle.post("/articles", createArticle);
routerArticle.get("/articles", getAllArticle);
routerArticle.get("/articles/:id", getArticleById);
routerArticle.put("/articles/:id", updateArticle);
routerArticle.delete("/articles/:id", deleteArticle);