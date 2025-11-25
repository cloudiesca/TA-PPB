import ProductCard from './ProductCard';

export default function ProductGrid({ products, onProductClick }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada produk tersedia</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onProductClick(product.id)}
                />
            ))}
        </div>
    );
}