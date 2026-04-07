import express from 'express';
import { createHelp, getAllHelp, updateHelp, deleteHelp, getAllHelpById } 
from '../Controller/HelpControllers.js';
import verifyToken from "../Middleware/VerifyToken.js";
import isAdmin from "../Middleware/isAdmin.js";

const router = express.Router();

// User + Admin xem
router.get("/", verifyToken, getAllHelp);
router.get("/:id", verifyToken, getAllHelpById);

// Chỉ Admin
router.post("/", verifyToken, isAdmin, createHelp);
router.put("/:id", verifyToken, isAdmin, updateHelp);
router.delete("/:id", verifyToken, isAdmin, deleteHelp);

export default router;