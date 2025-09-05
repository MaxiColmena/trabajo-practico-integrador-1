import express from "express";
import { registerCreate } from "../controllers/auth.controllers.js";

export const routerAuth = express.Router();

routerAuth.post("/auth/register", registerCreate);