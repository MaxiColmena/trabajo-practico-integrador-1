import express from "express";
import {createTag, getAllTag, getTagById, updateTag, deleteTag} from "../controllers/tag.controllers.js";
export const routerTag = express.Router();

routerTag.post("/tags", createTag);
routerTag.get("/tags", getAllTag);
routerTag.get("/tags/:id", getTagById);
routerTag.put("/tags/:id", updateTag);
routerTag.delete("/tags/:id", deleteTag);