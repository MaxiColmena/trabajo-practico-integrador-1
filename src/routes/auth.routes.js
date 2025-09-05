import express from "express";
import { createUserValidation } from "../middlewares/validations/auth.validation.js";
import { createProfileValidation, deleteProfileValidation, getIdProfileValidation, updateProfileValidation } from "../middlewares/validations/profile.validation.js";
import { login, logout, register } from "../controllers/auth.controllers.js";
import { aplicarValidaciones } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { dataValida } from "../middlewares/match.js";
import { profileId, profileUpdate } from "../controllers/profile.controllers.js";

export const routerAuth = express.Router();
routerAuth.post( "/auth/register", createUserValidation, createProfileValidation, aplicarValidaciones, dataValida, register);
routerAuth.post("/auth/login", login);
routerAuth.post("/auth/logout", logout);
routerAuth.get( "/auth/profile", authMiddleware, getIdProfileValidation, aplicarValidaciones, profileId);
routerAuth.put("/auth/profile", authMiddleware, updateProfileValidation, aplicarValidaciones, dataValida, profileUpdate);