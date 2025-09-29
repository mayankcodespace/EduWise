import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, BookOpen, Briefcase } from 'lucide-react';

interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  type: 'education' | 'skill' | 'career';
}

interface CareerRoadmapProps {
  career: string;
  roadmap: RoadmapStep[];
  isOpen: boolean;
  onClose: () => void;
}

const CareerRoadmap = ({ career, roadmap, isOpen, onClose }: CareerRoadmapProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return <BookOpen className="w-5 h-5" />;
      case 'skill': return <Target className="w-5 h-5" />;
      case 'career': return <Briefcase className="w-5 h-5" />;
      default: return <ChevronRight className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 overflow-hidden"
        >
          <div className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-foreground">{career} Roadmap</h4>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {roadmap.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                    {getIcon(step.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-foreground">{step.title}</h5>
                      <span className="text-sm text-muted-foreground">{step.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CareerRoadmap;