import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onClick }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
        >
            <div className="relative overflow-hidden bg-gray-100">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.stock < 10 && product.stock > 0 && (
                    <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Stok Terbatas
                    </span>
                )}
                {product.stock === 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Habis
                    </span>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-xs text-gray-500">{product.categories?.name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold text-indigo-600">
                        {formatPrice(product.price)}
                    </p>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle add to cart
                        }}
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}