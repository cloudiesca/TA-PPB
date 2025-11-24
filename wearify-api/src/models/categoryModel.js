import { supabase } from "../config/supabaseClient.js";

export const CategoryModel = {
    async getAll() {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("name", { ascending: true });
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },
};