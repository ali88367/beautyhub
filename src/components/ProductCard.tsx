import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { formatPriceLabel } from '../lib/pricing';

interface ProductCardProps {
  product: Product;
  onClick?: (image?: string) => void;
  key?: string | number;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const handleWhatsAppOrder = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const message = `Hi Beauty Store! I'd like to order ${product.name} (${formatPriceLabel(
      product.discountPrice || product.price,
    )}).`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const primaryImage = product.images[0];
  const displayPrice = formatPriceLabel(product.discountPrice || product.price);
  const originalPrice = formatPriceLabel(product.originalPrice || product.price);
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
      className="bg-white/95 rounded-[20px] overflow-hidden border border-gray-100/80 shadow-[0_14px_40px_rgba(17,24,39,0.08)] hover:shadow-[0_18px_50px_rgba(17,24,39,0.12)] hover:-translate-y-1 hover:border-beauty-pink/30 transition-all duration-300 flex flex-col h-full cursor-pointer group backdrop-blur-sm"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white via-beauty-blush/50 to-beauty-peach/30">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No image uploaded
          </div>
        )}
        {product.bestSeller && (
          <div className="absolute top-3 left-3 bg-beauty-pink-dark text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow gap-2.5">
        <p className="text-[11px] uppercase tracking-wide text-gray-500">{product.category}</p>
        <h3 className="font-medium text-sm sm:text-[15px] text-gray-900 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-beauty-pink-dark font-semibold text-base sm:text-lg">{displayPrice}</p>
          {showDiscount && (
            <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
          )}
        </div>
        <p className="text-xs text-gray-600 line-clamp-2 min-h-[32px] whitespace-pre-line">
          {product.description}
        </p>

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
