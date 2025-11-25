// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//     res.json({
//         message: "Wearify API",
//         version: "1.0.0",
//         endpoints: {
//             products: "/api/products",
//             categories: "/api/categories",
//         },
//     });
// });

// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`🚀 Server running on port ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Wearify API",
        version: "1.0.0",
        status: "running",
        endpoints: {
            products: "/api/products",
            categories: "/api/categories",
        },
    });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Internal server error"
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});