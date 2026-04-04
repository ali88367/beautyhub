import { Menu } from 'lucide-react';

interface NavbarProps {
  onOpenAllProducts: () => void;
}

export const Navbar = ({ onOpenAllProducts }: NavbarProps) => {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Best Sellers', href: '#best-sellers' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={onOpenAllProducts} className="md:hidden text-gray-600" aria-label="Open all products">
            <Menu size={24} />
          </button>
          <a href="#home" className="font-serif text-lg sm:text-xl font-bold text-beauty-pink-dark">
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

        <button
          onClick={onOpenAllProducts}
          className="inline-flex items-center justify-center rounded-full bg-beauty-pink text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-beauty-pink-dark transition-colors"
        >
          All Products
        </button>
      </div>
    </header>
  );
};
