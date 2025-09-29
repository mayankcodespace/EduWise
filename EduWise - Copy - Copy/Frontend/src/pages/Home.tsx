import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import Scene3D from "@/components/3D/Scene3D";
import GlassCard from "@/components/3D/GlassCard";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with 3D Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Scene3D />
        
        <div className="relative z-10 container mx-auto text-center max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-lg"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-medium">Premium Career Guidance Platform</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Welcome to EduWise
              </span>
              <br />
              <span className="text-foreground">
                Your Guide to the Future
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From confusion to clarity — discover your ideal stream, course, and career with AI-powered guidance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/streams-courses">
                <Button 
                  size="lg" 
                  className="px-12 py-6 text-lg font-semibold bg-gradient-primary hover:shadow-glow-primary border-0 group"
                >
                  Explore Career Options
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              
            </motion.div>
          </motion.div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">EduWise?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of career guidance with our intelligent, student-first platform.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "AI-Powered Guidance",
                description: "Our advanced AI understands your strengths, interests, and goals to guide you toward the perfect stream, course, and career — uniquely tailored for you.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: BookOpen,
                title: "Comprehensive Database",
                description: "Explore detailed insights on 1000+ streams, courses, and careers, making it easier than ever to plan a future backed by real opportunities",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Premium Experience",
                description: "An engaging, modern interface built to make career discovery seamless and inspiring — designed to keep you motivated every step of the way.",
                gradient: "from-emerald-500 to-teal-500"
              }
            ].map((feature, index) => (
              <GlassCard key={index} delay={index * 0.2}>
                <div className="text-center space-y-6">
                  <div className={`relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-glow-primary`}>
                    <feature.icon className="h-full w-full text-white" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-secondary relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Diverse streams and careers to match every dream." },
              { number: "50K+", label: "Lives transformed through clarity and direction." },
              { number: "95%", label: "Students finding the right path with confidence." },
              { number: "24/7", label: "Round-the-clock assistance for every step of your journey" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-display font-black bg-gradient-primary bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary rounded-lg animate-pulse" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full animate-pulse" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <GlassCard className="text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold">
                  Ready to Discover Your <span className="bg-gradient-primary bg-clip-text text-transparent">Future?</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of students who have found their perfect career path with our premium EduWise platform
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/streams-courses ">
                  <Button 
                    size="lg" 
                    className="px-12 py-6 text-lg font-semibold bg-gradient-primary hover:shadow-glow-primary border-0 group"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                
                <Link to="/about">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-6 text-lg backdrop-blur-lg bg-white/5 border-white/20 hover:bg-white/10"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default Home;