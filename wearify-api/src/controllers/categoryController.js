import { CategoryModel } from "../models/categoryModel.js";

export const CategoryController = {
    async getAll(req, res) {
        try {
            const categories = await CategoryModel.getAll();
            res.json({
                success: true,
                data: categories,
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
            const category = await CategoryModel.getById(id);
            res.json({
                success: true,
                data: category,
            });
        } catch (err) {
            res.status(404).json({
                success: false,
                error: err.message,
            });
        }
    },
};