import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import Header from '../components/layout/Header.jsx';
import CategoryCard from '../components/categories/CategoryCard.jsx';
import { Grid } from 'lucide-react';

export default function CategoriesListPage({ onNavigateToCategoryDetail }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await apiService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header title="Kategori Produk" />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Memuat kategori...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="Kategori Produk" />

            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <div className="flex items-center gap-2 mb-6">
                    <Grid className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Jelajahi Kategori
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onClick={() => onNavigateToCategoryDetail(category.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}