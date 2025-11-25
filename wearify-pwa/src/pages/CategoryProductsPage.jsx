import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import Header from '../components/layout/Header.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import { ArrowLeft } from 'lucide-react';

export default function CategoryProductsPage({ categoryId, onBack, onNavigateToProduct }) {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [categoryId]);

    const loadData = async () => {
        try {
            const [categoryData, productsData] = await Promise.all([
                apiService.getCategoryById(categoryId),
                apiService.getProductsByCategory(categoryId),
            ]);
            setCategory(categoryData);
            setProducts(productsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Memuat produk...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Kembali</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        {category?.name}
                    </h1>
                    <p className="text-lg text-indigo-100">
                        {category?.description}
                    </p>
                </div>

                {/* Products Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Menampilkan <span className="font-semibold text-indigo-600">{products.length}</span> produk
                    </p>
                </div>

                {/* Products Grid */}
                <ProductGrid
                    products={products}
                    onProductClick={onNavigateToProduct}
                />
            </div>
        </div>
    );
}