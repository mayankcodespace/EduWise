import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard = ({ children, className = "", delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      whileHover={{ 
        y: -10,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className={`
        relative p-6 rounded-2xl backdrop-blur-lg bg-gradient-glass
        border border-white/10 shadow-glass hover:shadow-floating
        transform-gpu transition-all duration-300
        before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-br before:from-white/5 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;