import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import Header from '../components/layout/Header';
import ProductGrid from '../components/products/ProductGrid';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function ProductsPage({ onNavigateToDetail }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterAndSortProducts();
    }, [searchQuery, selectedCategory, sortBy, products]);

    const loadData = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                apiService.getProducts(),
                apiService.getCategories(),
            ]);
            setProducts(productsData);
            setFilteredProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortProducts = () => {
        let filtered = [...products];

        // Filter by search
        if (searchQuery.trim() !== '') {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(
                (product) => product.category_id === selectedCategory
            );
        }

        // Sort products
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSortBy('newest');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header title="Semua Produk" />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 font-medium">Memuat produk...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="Semua Produk" />

            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                {/* Search & Filter Section */}
                <div className="space-y-4 mb-6">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                        />
                    </div>

                    {/* Filter Button & Active Filters */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center gap-2 bg-white border border-gray-300 hover:border-indigo-500 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:text-indigo-600 transition-all shadow-sm"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filter
                        </button>

                        {(selectedCategory !== 'all' || sortBy !== 'newest') && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-200 transition-all"
                            >
                                <X className="w-4 h-4" />
                                Reset Filter
                            </button>
                        )}
                    </div>

                    {/* Filter Panel */}
                    {showFilter && (
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 space-y-5 animate-fadeIn">
                            {/* Category Filter */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Kategori</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === 'all'
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Semua
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                                    ? 'bg-indigo-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3">Urutkan</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSortBy('newest')}
                                        className={`px-4 py-2.5 rounded-lg font-medium transition-all ${sortBy === 'newest'
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Terbaru
                                    </button>
                                    <button
                                        onClick={() => setSortBy('name')}
                                        className={`px-4 py-2.5 rounded-lg font-medium transition-all ${sortBy === 'name'
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Nama A-Z
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price-low')}
                                        className={`px-4 py-2.5 rounded-lg font-medium transition-all ${sortBy === 'price-low'
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Harga Terendah
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price-high')}
                                        className={`px-4 py-2.5 rounded-lg font-medium transition-all ${sortBy === 'price-high'
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Harga Tertinggi
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Products Count */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-gray-600 font-medium">
                        Menampilkan{' '}
                        <span className="font-bold text-indigo-600">{filteredProducts.length}</span>{' '}
                        produk
                    </p>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Produk tidak ditemukan
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Coba gunakan kata kunci lain atau ubah filter
                        </p>
                        <button
                            onClick={clearFilters}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                ) : (
                    <ProductGrid
                        products={filteredProducts}
                        onProductClick={onNavigateToDetail}
                    />
                )}
            </div>
        </div>
    );
}