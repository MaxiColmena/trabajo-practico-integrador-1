import express from "express";
import {createTag, getAllTag, getTagById, updateTag, deleteTag} from "../controllers/tag.controllers.js";
import { createTagValidation, deleteTagValidation, getIdTagValidation, updateTagValidation } from "../middlewares/validations/tag.validation.js";
import { authMiddleware } from "../middlewares/auth.js";
import { dataValida } from "../middlewares/match.js";
import { aplicateValidation } from "../middlewares/validator.js";
import { adminMiddleware } from "../middlewares/admin.js";

export const routerTag = express.Router();

routerTag.post("/tags",   authMiddleware, adminMiddleware, createTagValidation, aplicateValidation, createTag);

routerTag.get("/tags", authMiddleware, getAllTag);

routerTag.get("/tags/:id",   authMiddleware, adminMiddleware, getIdTagValidation, aplicateValidation, getTagById);

routerTag.put("/tags/:id",   authMiddleware, adminMiddleware, updateTagValidation, aplicateValidation, dataValida, updateTag);

routerTag.delete("/tags/:id",   authMiddleware, adminMiddleware, deleteTagValidation, aplicateValidation, deleteTag);