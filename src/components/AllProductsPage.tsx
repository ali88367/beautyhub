import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { Button } from './Button';

interface AllProductsPageProps {
  products: Product[];
  categories: ProductCategory[];
  onBack: () => void;
  onOpenProduct: (product: Product, image?: string) => void;
}

export const AllProductsPage = ({ products, categories, onBack, onOpenProduct }: AllProductsPageProps) => {
  const [query, setQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<ProductCategory | 'All'>('All');
  const [bestOnly, setBestOnly] = React.useState(false);

  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      if (bestOnly && !product.bestSeller) return false;
      if (activeCategory !== 'All' && product.category !== activeCategory) return false;
      if (!normalized) return true;
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized)
      );
    });
  }, [products, query, activeCategory, bestOnly]);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-5 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-800"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-beauty-pink/30"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-5 pb-4">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-xs transition ${
              activeCategory === 'All' ? 'bg-beauty-pink text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs transition ${
                activeCategory === category ? 'bg-beauty-pink text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setBestOnly((prev) => !prev)}
            className={`px-4 py-2 rounded-full text-xs transition ${
              bestOnly ? 'bg-beauty-pink text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Best Sellers
          </button>
        </div>
      </div>

      <div className="px-5 pt-5 pb-24">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">{filtered.length} products</p>
          <Button
            variant="outline"
            className="text-xs px-3 py-2"
            onClick={() => {
              setQuery('');
              setActiveCategory('All');
              setBestOnly(false);
            }}
          >
            Clear Filters
          </Button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => onOpenProduct(product, product.images[0])}
                className="text-left bg-white border border-gray-100 rounded-[var(--radius-beauty)] overflow-hidden hover:border-beauty-pink/30 transition"
              >
                <div className="aspect-square bg-gray-50">
                  <img src="/images/prod1.png" alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-[11px] uppercase tracking-wide text-gray-500">{product.category}</p>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-beauty-pink-dark font-semibold text-sm">
                      {product.discountPrice || product.price}
                    </p>
                    {product.discountPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
                        {product.originalPrice || product.price}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
