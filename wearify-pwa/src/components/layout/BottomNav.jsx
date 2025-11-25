import { Home, Grid, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({ currentPage, onNavigate }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'categories', icon: Grid, label: 'Kategori' },
        { id: 'products', icon: ShoppingBag, label: 'Produk' },
        { id: 'about', icon: User, label: 'About' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive
                                    ? 'text-indigo-600'
                                    : 'text-gray-500 hover:text-indigo-500'
                                }`}
                        >
                            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-2' : ''}`} />
                            <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}