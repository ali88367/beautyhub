import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Mail, Phone } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { ProductCard } from './components/ProductCard';
import { ProductPage } from './components/ProductPage';
import { AllProductsPage } from './components/AllProductsPage';
import { Button } from './components/Button';
import { Product } from './types';
import { CATEGORY_OPTIONS, getAllProducts } from './lib/products';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const products = useMemo(() => getAllProducts(), []);

  const bestSellers = useMemo(() => products.filter((p) => p.bestSeller), [products]);
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);


  return (
    <div className="pt-16 pb-20 sm:pb-24">
      <Navbar
        onOpenAllProducts={() => {
          setShowAllProducts(true);
          setActiveProduct(null);
          setActiveImage(undefined);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {activeProduct && (
        <ProductPage
          product={activeProduct}
          initialImage={activeImage}
          onBack={() => {
            setActiveProduct(null);
            setActiveImage(undefined);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {!activeProduct && showAllProducts && (
        <AllProductsPage
          products={products}
          categories={CATEGORY_OPTIONS}
          onBack={() => {
            setShowAllProducts(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenProduct={(product, image) => {
            setActiveProduct(product);
            setActiveImage(image);
          }}
        />
      )}

      {!activeProduct && !showAllProducts && (
        <>
          <section
            id="home"
            className="relative min-h-[460px] sm:min-h-[520px] h-[78vh] sm:h-[65vh] flex items-end sm:items-center overflow-hidden bg-beauty-blush/30"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/images/banner.jpeg"
                alt="Beauty Banner"
                className="w-full h-full object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-white/85 via-white/60 to-transparent" />
            </div>

            <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full pb-8 sm:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md sm:max-w-lg"
              >
                <span className="text-beauty-pink-dark font-semibold tracking-[0.25em] text-[10px] sm:text-xs uppercase mb-3 sm:mb-4 block">
                  Beauty Store
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl text-gray-900 leading-tight mb-4 sm:mb-6 max-w-[10ch] sm:max-w-none">
                  Pure Skin. <br />
                  <span className="text-beauty-pink-dark italic">Natural Glow.</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={() => {
                      setShowAllProducts(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto"
                  >
                    All Products
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('best-sellers')?.scrollIntoView()}
                    className="w-full sm:w-auto"
                  >
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
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
            {bestSellers.map((product) => (
              <div key={product.id} className="min-w-[160px] max-w-[160px] sm:min-w-[190px] sm:max-w-[190px] flex-shrink-0">
                <ProductCard
                  product={product}
                  onClick={(image) => {
                    setActiveProduct(product);
                    setActiveImage(image);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <div className="mt-6">
          <Button
            onClick={() => {
              setShowAllProducts(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto"
          >
            View All Products
          </Button>
        </div>
      </Section>

      <Section id="all-products" title="Our Collection" className="max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5 sm:mb-6 pr-2">
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
          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={(image) => {
                  setActiveProduct(product);
                  setActiveImage(image);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        )}
        <div className="mt-6">
          <Button
            onClick={() => {
              setShowAllProducts(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto"
          >
            View All Products
          </Button>
        </div>
      </Section>

        <footer className="bg-beauty-pink-light/20 pt-14 sm:pt-16 pb-28 sm:pb-32 px-4 sm:px-6 sm:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h2 className="font-serif text-2xl text-beauty-pink-dark mb-4">Beauty Store</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your everyday glow partner for skincare and makeup essentials made to feel effortless.
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
                  <button
                    onClick={() => setShowAllProducts(true)}
                    className="hover:text-beauty-pink transition-colors text-left"
                  >
                    Our Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowAllProducts(true)}
                    className="hover:text-beauty-pink transition-colors text-left"
                  >
                    All Products
                  </button>
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
        </>
      )}
    </div>
  );
}
