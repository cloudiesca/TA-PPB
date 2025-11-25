import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import Header from '../components/layout/Header';
import ProductGrid from '../components/products/ProductGrid';
import { TrendingUp, Sparkles } from 'lucide-react';

export default function HomePage({ onNavigateToDetail }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                apiService.getProducts(),
                apiService.getCategories(),
            ]);
            setProducts(productsData.slice(0, 4));
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header title="Selamat Datang" />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Memuat...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="Selamat Datang" />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Fashion Terbaru untuk Anda
                    </h2>
                    <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                        Temukan koleksi baju trendy dengan kualitas terbaik dan harga terjangkau
                    </p>
                </div>
            </div>

            {/* Featured Products */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Produk Terpopuler</h3>
                </div>

                <ProductGrid
                    products={products}
                    onProductClick={onNavigateToDetail}
                />

                <div className="text-center mt-8">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Lihat Semua Produk
                    </button>
                </div>
            </div>
        </div>
    );
}