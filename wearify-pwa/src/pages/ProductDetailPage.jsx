import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import Header from '../components/layout/Header';
import {
    ArrowLeft,
    ShoppingCart,
    Heart,
    Share2,
    Package,
    Truck,
    Shield,
    Star,
    Minus,
    Plus,
    Check,
} from 'lucide-react';

export default function ProductDetailPage({ productId, onBack }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [productId]);

    const loadProduct = async () => {
        try {
            const data = await apiService.getProductById(productId);
            setProduct(data);

            // Set default size & color
            if (data.size) {
                const sizes = data.size.split(',').map(s => s.trim());
                setSelectedSize(sizes[0]);
            }
            if (data.color) {
                const colors = data.color.split(',').map(c => c.trim());
                setSelectedColor(colors[0]);
            }
        } catch (error) {
            console.error('Error loading product:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase' && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out ${product.name} at Wearify!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 font-medium">Memuat detail produk...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <Package className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Produk tidak ditemukan
                        </h3>
                        <button
                            onClick={onBack}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all mt-4"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const sizes = product.size ? product.size.split(',').map(s => s.trim()) : [];
    const colors = product.color ? product.color.split(',').map(c => c.trim()) : [];

    return (
        <div className="min-h-screen bg-gray-50 pb-32 md:pb-8">
            <Header />

            {/* Success Notification */}
            {showNotification && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Berhasil ditambahkan ke keranjang!</span>
                    </div>
                </div>
            )}

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Kembali</span>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative group">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-96 md:h-[550px] object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Stock Badge */}
                            {product.stock < 10 && product.stock > 0 && (
                                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                    Stok Terbatas
                                </div>
                            )}
                            {product.stock === 0 && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                    Stok Habis
                                </div>
                            )}

                            {/* Favorite Button */}
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="absolute top-4 left-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all"
                            >
                                <Heart
                                    className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-xl shadow-md p-4 text-center">
                                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                <p className="text-xs font-semibold text-gray-700">100% Original</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-4 text-center">
                                <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-xs font-semibold text-gray-700">Gratis Ongkir</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-md p-4 text-center">
                                <Package className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                <p className="text-xs font-semibold text-gray-700">Retur Mudah</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-5">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-5">
                            {/* Category & Rating */}
                            <div className="flex items-center justify-between">
                                <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                                    {product.categories?.name}
                                </span>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">(4.0)</span>
                                </div>
                            </div>

                            {/* Product Name */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-sm text-gray-500 mt-2">SKU: {product.sku}</p>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5">
                                <p className="text-sm text-gray-600 mb-1">Harga</p>
                                <p className="text-4xl font-bold text-indigo-600">
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            {/* Stock Info */}
                            <div className="flex items-center gap-3 pb-5 border-b border-gray-200">
                                <Package className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-700">
                                    Stok tersedia:{' '}
                                    <span className={`font-bold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                                        {product.stock} pcs
                                    </span>
                                </span>
                            </div>

                            {/* Size Selection */}
                            {sizes.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                        Pilih Ukuran
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${selectedSize === size
                                                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color Selection */}
                            {colors.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                        Pilih Warna
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${selectedColor === color
                                                        ? 'bg-indigo-600 text-white shadow-md scale-105'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Jumlah</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        disabled={quantity <= 1}
                                        className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg transition-all"
                                    >
                                        <Minus className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <span className="text-2xl font-bold text-gray-800 w-16 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        disabled={quantity >= product.stock}
                                        className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg transition-all"
                                    >
                                        <Plus className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Total Price */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-indigo-100 mb-1">Total Harga</p>
                                        <p className="text-3xl font-bold">
                                            {formatPrice(product.price * quantity)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-indigo-100">Hemat</p>
                                        <p className="text-xl font-semibold">Gratis Ongkir</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Package className="w-6 h-6 text-indigo-600" />
                                Deskripsi Produk
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <Truck className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">Pengiriman Gratis!</h3>
                                    <p className="text-green-50 text-sm leading-relaxed">
                                        Nikmati gratis ongkir untuk pembelian minimal Rp 200.000 ke
                                        seluruh Indonesia. Estimasi pengiriman 2-4 hari kerja.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}