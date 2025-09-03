import express from "express";
import {createProfile, getAllProfile, getProfileById, updateProfile, deleteProfile} from "../controllers/profile.controllers.js";
export const routerProfile = express.Router();

routerProfile.post("/profiles", createProfile);
routerProfile.get("/profiles", getAllProfile);
routerProfile.get("/profiles/:id", getProfileById);
routerProfile.put("/profiles/:id", updateProfile);
routerProfile.delete("/profiles/:id", deleteProfile);