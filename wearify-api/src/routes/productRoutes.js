// import express from "express";
// import { ProductController } from "../controllers/productController.js";

// const router = express.Router();

// router.get("/", ProductController.getAll);
// router.get("/:id", ProductController.getById);
// router.get("/category/:categoryId", ProductController.getByCategory);

// export default router;

import express from "express";
import { ProductController } from "../controllers/productController.js";

const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/featured", ProductController.getFeatured);
router.get("/:id", ProductController.getById);
router.get("/category/:categoryId", ProductController.getByCategory);

export default router;