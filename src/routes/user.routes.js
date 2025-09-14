import express from "express";
import { getAllUser, getUserById, updateUser, deleteUser} from "../controllers/user.controllers.js";
import { deleteUserValidation, getIdUserValidation, updateUserValidation } from "../middlewares/validations/user.validation.js";
import { aplicateValidation } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { adminMiddleware } from "../middlewares/admin.js";
import { dataValida } from "../middlewares/match.js";


export const routerUser = express.Router();

routerUser.get("/users", authMiddleware, adminMiddleware, getAllUser);

routerUser.get("/users/:id",   authMiddleware, adminMiddleware, getIdUserValidation, aplicateValidation,getUserById);

routerUser.put("/users/:id",   authMiddleware, adminMiddleware, updateUserValidation, aplicateValidation, dataValida, updateUser);

routerUser.delete("/users/:id", authMiddleware, adminMiddleware, deleteUserValidation, aplicateValidation, deleteUser);
