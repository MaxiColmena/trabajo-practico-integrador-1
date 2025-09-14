import express from "express";
import {createArticle, getAllArticle, getArticleById, updateArticle, deleteArticle, articlesGetUser, articleGetIdUser} from "../controllers/article.controllers.js";
import { createaArticleValidation, deleteArticleValidation, updateArticleValidation, getIdArticleValidation } from "../middlewares/validations/article.validation.js";
import { authMiddleware } from "../middlewares/auth.js";
import { ownerMiddleware } from "../middlewares/owner.js";
import { dataValida } from "../middlewares/match.js";
import { aplicateValidation } from "../middlewares/validator.js";

export const routerArticle = express.Router();

routerArticle.post( "/articles", authMiddleware, createaArticleValidation, aplicateValidation, dataValida, createArticle);

routerArticle.get("/articles", authMiddleware, getAllArticle);

routerArticle.get("/articles/:id", authMiddleware, getIdArticleValidation, aplicateValidation, getArticleById);

routerArticle.get("/article/user", authMiddleware, articlesGetUser);

routerArticle.get("/articles/user/:id", authMiddleware, getIdArticleValidation, aplicateValidation, articleGetIdUser);

routerArticle.put("/articles/:id", authMiddleware, ownerMiddleware, updateArticleValidation, aplicateValidation, dataValida, updateArticle);

routerArticle.delete("/articles/:id", authMiddleware, ownerMiddleware, deleteArticleValidation, aplicateValidation, deleteArticle);
