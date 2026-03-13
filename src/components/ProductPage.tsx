import React from 'react';
import { ArrowLeft, MessageCircle, ShieldCheck, Star, Truck } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  initialImage?: string;
}

export const ProductPage = ({ product, onBack, initialImage }: ProductPageProps) => {
  const handleWhatsAppOrder = () => {
    const message = `Hi Beauty Store! I'd like to order ${product.name} (${product.price}).`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const images = React.useMemo(() => {
    if (product.images.length > 0) return product.images;
    return ['/images/prod1.png'];
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
  const displayPrice = product.discountPrice || product.price;
  const originalPrice = product.originalPrice || product.price;
  const showDiscount = Boolean(product.discountPrice);

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
    <div className="min-h-screen bg-white">
      <div
        className="relative bg-gray-50"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-gray-800 shadow-md"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <img
          src={selectedImage}
          alt={product.name}
          className="w-full aspect-[4/5] sm:aspect-square object-cover"
          referrerPolicy="no-referrer"
        />

        {canSwipe && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 bg-white border-t border-gray-100">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setSelectedIndex(index)}
                className={`h-16 w-16 flex-shrink-0 rounded-md border transition ${
                  selectedIndex === index ? 'border-beauty-pink' : 'border-transparent'
                }`}
                aria-label={`Select ${product.name} image`}
              >
                <img src={image} alt={product.name} className="h-full w-full object-cover rounded-md" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pt-5 pb-24">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-beauty-pink">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">Top rated</span>
        </div>

        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{product.category}</p>
        <h1 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
          <p className="text-beauty-pink-dark font-bold text-xl sm:text-2xl">{displayPrice}</p>
          {showDiscount && <span className="text-sm text-gray-400 line-through">{originalPrice}</span>}
        </div>

        <div className="space-y-4 mb-6">
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
    </div>
  );
};
