import { Menu } from 'lucide-react';
import { motion } from 'motion/react';

export const Navbar = () => {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Best Sellers', href: '#best-sellers' },
    { label: 'All Products', href: '#all-products' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-gray-600">
            <Menu size={24} />
          </button>
          <a href="#home" className="font-serif text-xl font-bold text-beauty-pink-dark">
            BEAUTY HUB
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-beauty-pink transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="w-10 md:hidden" /> {/* Spacer for mobile alignment */}
      </div>
    </header>
  );
};
