import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, Phone } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { Button } from './components/Button';
import { Product } from './types';
import { CATEGORY_OPTIONS, getAllProducts } from './lib/products';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const products = useMemo(() => getAllProducts(), []);

  const bestSellers = useMemo(() => products.filter((p) => p.bestSeller), [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <div className="pt-16 pb-24">
      <Navbar />

      <AnimatePresence>
        {activeProduct && <ProductDetails product={activeProduct} onClose={() => setActiveProduct(null)} />}
      </AnimatePresence>

      <section id="home" className="relative h-[65vh] flex items-center overflow-hidden bg-beauty-blush/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1920"
            alt="Beauty Banner"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/65 to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-8 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <span className="text-beauty-pink-dark font-semibold tracking-widest text-xs uppercase mb-4 block">Beauty Store</span>
            <h1 className="font-serif text-4xl md:text-7xl text-gray-900 leading-tight mb-6">
              Pure Skin. <br />
              <span className="text-beauty-pink-dark italic">Natural Glow.</span>
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-8 max-w-md">
              Shop curated beauty essentials. Products are managed directly from your Netlify admin panel.
            </p>
            <div className="flex gap-4">
              <Button onClick={() => document.getElementById('all-products')?.scrollIntoView()}>Shop Now</Button>
              <Button variant="outline" onClick={() => document.getElementById('best-sellers')?.scrollIntoView()}>
                Best Sellers
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="best-sellers" title="Best Sellers" className="max-w-7xl mx-auto">
        {bestSellers.length === 0 ? (
          <p className="text-sm text-gray-500">No best seller products yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setActiveProduct(product)} />
            ))}
          </div>
        )}
      </Section>

      <Section id="all-products" title="Our Collection" className="max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              selectedCategory === null ? 'bg-beauty-pink text-white' : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            All
          </button>
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-beauty-pink text-white' : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-sm text-gray-500">No products found for this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setActiveProduct(product)} />
            ))}
          </div>
        )}
      </Section>

      <footer className="bg-beauty-pink-light/20 pt-16 pb-32 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="font-serif text-2xl text-beauty-pink-dark mb-4">Beauty Store</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your everyday glow partner. Manage products at /admin and publish updates without coding.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#home" className="hover:text-beauty-pink transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#best-sellers" className="hover:text-beauty-pink transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#all-products" className="hover:text-beauty-pink transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-beauty-pink transition-colors">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-beauty-pink hover:bg-beauty-pink hover:text-white transition-all shadow-sm">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-beauty-pink hover:bg-beauty-pink hover:text-white transition-all shadow-sm">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-beauty-pink hover:bg-beauty-pink hover:text-white transition-all shadow-sm">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-500">© 2026 Beauty Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
