import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { MessageCircle } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onClick?: (image?: string) => void;
  key?: string | number;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const handleWhatsAppOrder = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const message = `Hi Beauty Store! I'd like to order ${product.name} (${product.price}).`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const primaryImage = '/images/prod1.png';
  const displayPrice = product.discountPrice || product.price;
  const originalPrice = product.originalPrice || product.price;
  const showDiscount = Boolean(product.discountPrice);
  const handleOpen = (image?: string) => {
    if (onClick) onClick(image);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => handleOpen(primaryImage)}
      className="bg-white rounded-[var(--radius-beauty)] overflow-hidden border border-gray-100 hover:border-beauty-pink/30 transition-all duration-300 flex flex-col h-full cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.bestSeller && (
          <div className="absolute top-3 left-3 bg-beauty-pink-dark text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Best Seller
          </div>
        )}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-2">
            {product.images.slice(0, 4).map((image) => (
              <button
                key={image}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(image);
                }}
                className="h-10 w-10 rounded-md border border-white/70 shadow-sm overflow-hidden bg-white"
                aria-label={`Open ${product.name} image`}
              >
                <img src={image} alt={product.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2">
        <p className="text-[11px] uppercase tracking-wide text-gray-500">{product.category}</p>
        <h3 className="font-medium text-sm text-gray-800 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <p className="text-beauty-pink-dark font-semibold text-base sm:text-lg">{displayPrice}</p>
          {showDiscount && (
            <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 line-clamp-2 min-h-[32px]">{product.description}</p>

        <Button
          variant="whatsapp"
          className="mt-auto py-2 px-3 text-xs"
          onClick={handleWhatsAppOrder}
          fullWidth
        >
          <MessageCircle size={14} />
          Order Now
        </Button>
      </div>
    </motion.div>
  );
};
