import { supabase } from "../config/supabaseClient.js";

export const ProductModel = {
    async getAll() {
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
            .order("created_at", { ascending: false });
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
};