// import { supabase } from "../config/supabaseClient.js";

// export const ProductModel = {
//     async getAll() {
//         const { data, error } = await supabase
//             .from("products")
//             .select(`
//         *,
//         categories (
//           id,
//           name,
//           description
//         )
//       `)
//             .order("created_at", { ascending: false });
//         if (error) throw error;
//         return data;
//     },

//     async getById(id) {
//         const { data, error } = await supabase
//             .from("products")
//             .select(`
//         *,
//         categories (
//           id,
//           name,
//           description
//         )
//       `)
//             .eq("id", id)
//             .single();
//         if (error) throw error;
//         return data;
//     },

//     async getByCategory(categoryId) {
//         const { data, error } = await supabase
//             .from("products")
//             .select(`
//         *,
//         categories (
//           id,
//           name,
//           description
//         )
//       `)
//             .eq("category_id", categoryId)
//             .order("created_at", { ascending: false });
//         if (error) throw error;
//         return data;
//     },
// };

import { supabase } from "../config/supabaseClient.js";

export const ProductModel = {
    async getAll(filters = {}) {
        let query = supabase
            .from("products")
            .select(`
                *,
                categories (
                    id,
                    name,
                    description
                )
            `);

        // Apply filters
        if (filters.category) {
            query = query.eq("category_id", filters.category);
        }

        if (filters.search) {
            query = query.ilike("name", `%${filters.search}%`);
        }

        // Apply sorting
        const sortOrder = filters.sort === "oldest" ? true : false;
        query = query.order("created_at", { ascending: sortOrder });

        // Apply limit
        if (filters.limit) {
            query = query.limit(filters.limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from("products")
            .select(`
                *,
                categories (
                    id,
                    name,
                    description
                )
            `)
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    async getByCategory(categoryId) {
        const { data, error } = await supabase
            .from("products")
            .select(`
                *,
                categories (
                    id,
                    name,
                    description
                )
            `)
            .eq("category_id", categoryId)
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
    },

    async getFeatured() {
        const { data, error } = await supabase
            .from("products")
            .select(`
                *,
                categories (
                    id,
                    name,
                    description
                )
            `)
            .eq("is_featured", true)
            .limit(6);
        if (error) throw error;
        return data;
    }
};