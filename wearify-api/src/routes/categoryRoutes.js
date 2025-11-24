import express from "express";
import { CategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);

export default router;