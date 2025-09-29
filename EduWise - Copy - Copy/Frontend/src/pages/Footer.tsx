import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gradient-secondary border-t border-white/10 py-8 mt-16 backdrop-blur-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.p 
          className="text-muted-foreground"
          whileHover={{ scale: 1.05 }}
        >
          © 2025 <span className="bg-gradient-primary bg-clip-text text-transparent font-semibold">EduWise</span>. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;