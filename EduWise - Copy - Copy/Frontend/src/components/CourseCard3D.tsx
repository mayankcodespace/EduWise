import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import GlassCard from './3D/GlassCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CourseCard3DProps {
  id: string;
  title: string;
  description: string;
  category?: string;
  delay?: number;
}

const CourseCard3D = ({ id, title, description, category, delay = 0 }: CourseCard3DProps) => {
  return (
    <GlassCard delay={delay} className="h-full group">
      <div className="space-y-4">
        {category && (
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-3 h-3" />
            {category}
          </motion.div>
        )}
        
        <motion.h3 
          className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <motion.div 
          className="pt-4"
          whileHover={{ scale: 1.02 }}
        >
          <Link to={`/course/${id}`}>
            <Button 
              className="w-full group/btn bg-gradient-primary hover:shadow-glow-primary border-0 font-medium"
              size="lg"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
    </GlassCard>
  );
};

export default CourseCard3D;