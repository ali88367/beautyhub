import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { X, MessageCircle, Star, ShieldCheck, Truck } from 'lucide-react';
import { Button } from './Button';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  initialImage?: string;
}

export const ProductDetails = ({ product, onClose, initialImage }: ProductDetailsProps) => {
  const handleWhatsAppOrder = () => {
    const message = `Hi Beauty Store! I'd like to order ${product.name} (${product.price}).`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const images = React.useMemo(() => {
    if (product.images.length > 0) return product.images;
    return ['https://placehold.co/900x900?text=Beauty+Store'];
  }, [product.images]);

  const initialIndex = React.useMemo(() => {
    if (!initialImage) return 0;
    const index = images.indexOf(initialImage);
    return index >= 0 ? index : 0;
  }, [images, initialImage]);

  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  React.useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  const selectedImage = images[selectedIndex];
  const canSwipe = images.length > 1;
  const swipeThreshold = 40;

  const goNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!canSwipe) return;
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!canSwipe || touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (Math.abs(delta) < swipeThreshold) {
      setTouchStartX(null);
      return;
    }
    if (delta < 0) goNext();
    if (delta > 0) goPrev();
    setTouchStartX(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-4xl h-[100svh] md:h-auto md:max-h-[90vh] rounded-none md:rounded-[32px] overflow-hidden relative flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-gray-800 hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>

        <div
          className="w-full md:w-1/2 h-[52%] sm:h-1/2 md:h-auto bg-gray-50 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {canSwipe && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 bg-white border-t border-gray-100">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedIndex(index)}
                  className={`rounded border transition ${
                    selectedIndex === index ? 'border-beauty-pink' : 'border-transparent'
                  }`}
                  aria-label={`Select ${product.name} image`}
                >
                  <img src={image} alt={product.name} className="w-full aspect-square object-cover rounded" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 px-5 pt-6 pb-24 md:p-12 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-beauty-pink">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">Top rated</span>
          </div>

          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{product.category}</p>
          <h2 className="font-serif text-2xl md:text-4xl text-gray-900 mb-2">{product.name}</h2>
          <p className="text-beauty-pink-dark font-bold text-xl md:text-2xl mb-4 md:mb-6">{product.price}</p>

          <div className="space-y-4 mb-6 md:mb-8">
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck size={18} className="text-beauty-pink" />
                Dermatologically tested & safe
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Truck size={18} className="text-beauty-pink" />
                Delivery available nationwide
              </li>
            </ul>
          </div>

          <div className="md:static sticky bottom-0 -mx-5 px-5 py-4 bg-white border-t border-gray-100 flex flex-col gap-3">
            <Button variant="whatsapp" fullWidth onClick={handleWhatsAppOrder} className="py-4">
              <MessageCircle size={20} />
              Order via WhatsApp
            </Button>
            <p className="text-[10px] text-center text-gray-400 italic">
              Clicking will open WhatsApp chat with Beauty Store support.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
