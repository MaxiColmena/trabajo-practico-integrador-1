import express from "express";
import { createUserValidation } from "../middlewares/validations/auth.validation.js";
import { createProfileValidation, deleteProfileValidation, getIdProfileValidation, updateProfileValidation } from "../middlewares/validations/profile.validation.js";
import { login, logout, register } from "../controllers/auth.controllers.js";
import { aplicateValidation } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { dataValida } from "../middlewares/match.js";
import {updateProfile, getProfileById} from "../controllers/profile.controllers.js"
export const routerAuth = express.Router();
routerAuth.post( "/auth/register", createUserValidation, createProfileValidation, aplicateValidation, dataValida, register);
routerAuth.post("/auth/login", login);
routerAuth.post("/auth/logout", logout);
routerAuth.get( "/auth/profile", authMiddleware, getIdProfileValidation, aplicateValidation, getProfileById);
routerAuth.put("/auth/profile", authMiddleware, updateProfileValidation, aplicateValidation, dataValida, updateProfile);