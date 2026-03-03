import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  className?: string;
  fullWidth?: boolean;
}

export const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-beauty-pink text-white shadow-lg shadow-beauty-pink/30 hover:bg-beauty-pink-dark active:scale-95 animate-shimmer",
    secondary: "bg-beauty-pink-light text-beauty-pink-dark hover:bg-beauty-pink/20 active:scale-95",
    outline: "border-2 border-beauty-pink text-beauty-pink hover:bg-beauty-pink hover:text-white active:scale-95",
    whatsapp: "bg-beauty-pink-dark text-white shadow-lg shadow-beauty-pink-dark/20 hover:bg-beauty-pink active:scale-95",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};
