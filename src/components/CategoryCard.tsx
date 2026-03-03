import { motion } from 'motion/react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
  key?: string | number;
}

export const CategoryCard = ({ category, isActive, onClick }: CategoryCardProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex-shrink-0 w-24 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300`}
    >
      <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${isActive ? 'border-beauty-pink shadow-lg shadow-beauty-pink/20' : 'border-transparent'}`}>
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <span className={`text-xs font-medium ${isActive ? 'text-beauty-pink-dark' : 'text-gray-500'}`}>
        {category.name}
      </span>
    </motion.div>
  );
};
