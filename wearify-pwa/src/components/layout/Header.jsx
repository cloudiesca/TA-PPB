import { ShoppingBag } from 'lucide-react';

export default function Header({ title }) {
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-8 h-8" />
                        <div>
                            <h1 className="text-2xl font-bold">Wearify</h1>
                            {title && <p className="text-sm text-indigo-100">{title}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}