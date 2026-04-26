import { useState, useEffect } from 'react';
import { getCategories } from '../services/mealdbApi';

export default function CategoryPills({ activeCategory, onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((cats) => setCategories(cats.slice(0, 12)));
  }, []);

  if (!categories.length) return null;

  return (
    <div className="py-8">
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-4">Browse by Category</p>
      <div className="flex gap-2.5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            onClick={() => onSelect(cat.strCategory)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                        transition-all duration-200
                        ${activeCategory === cat.strCategory
                          ? 'bg-accent/15 border-accent text-accent-light'
                          : 'glass border-white/10 text-gray-400 hover:border-accent/40 hover:text-accent-light'}`}
          >
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              className="w-5 h-5 rounded-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
