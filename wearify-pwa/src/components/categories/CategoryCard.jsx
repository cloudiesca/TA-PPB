import { ChevronRight } from 'lucide-react';

export default function CategoryCard({ category, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-6 text-white group"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                    <p className="text-sm text-indigo-100 opacity-90">
                        {category.description}
                    </p>
                </div>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>
    );
}