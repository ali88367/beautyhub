import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section = ({ id, title, children, className = '', dark = false }: SectionProps) => {
  return (
    <section id={id} className={`py-12 px-6 ${dark ? 'bg-beauty-pink-light/10' : ''} ${className}`}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl text-gray-800 mb-8"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </section>
  );
};
