import { ProductModel } from "../models/productModel.js";

export const ProductController = {
    async getAll(req, res) {
        try {
            const products = await ProductModel.getAll();
            res.json({
                success: true,
                data: products,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.getById(id);
            res.json({
                success: true,
                data: product,
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                error: err.message,
            });
        }
    },

    async getByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const products = await ProductModel.getByCategory(categoryId);
            res.json({
                success: true,
                data: products,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        }
    },
};