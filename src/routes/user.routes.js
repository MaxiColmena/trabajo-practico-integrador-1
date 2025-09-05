import express from "express";
import { getAllUser, getUserById, updateUser, deleteUser} from "../controllers/user.controllers.js";
export const routerUser = express.Router();

routerUser.get("/users", getAllUser);
routerUser.get("/users/:id", getUserById);
routerUser.put("/users/:id", updateUser);
routerUser.delete("/users/:id", deleteUser);