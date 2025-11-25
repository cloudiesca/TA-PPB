const API_URL = 'https://ta-ppb-v9o1.vercel.app/';
// Ganti dengan URL API Anda setelah deploy

export const apiService = {
    async getProducts() {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        return data.data;
    },

    async getProductById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();
        return data.data;
    },

    async getCategories() {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        return data.data;
    },

    async getCategoryById(id) {
        const response = await fetch(`${API_URL}/categories/${id}`);
        const data = await response.json();
        return data.data;
    },

    async getProductsByCategory(categoryId) {
        const response = await fetch(`${API_URL}/products/category/${categoryId}`);
        const data = await response.json();
        return data.data;
    },
};