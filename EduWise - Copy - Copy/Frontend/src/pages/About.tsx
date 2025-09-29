import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Sparkles } from "lucide-react";
import GlassCard from "@/components/3D/GlassCard";
import Scene3D from "@/components/3D/Scene3D";

const About = () => {
  return (
    <div className="min-h-screen bg-background pt-24 relative">
      {/* 3D Background */}
      <div className="fixed inset-0 opacity-20">
        <Scene3D />
      </div>
      
      <div className="relative z-10 py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-black mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About <span className="bg-gradient-primary bg-clip-text text-transparent">EduWise</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              EduWise helps students confidently choose the right career path after 10th and 12th with simple, personalized guidance and reliable information.

            </motion.p>
          </motion.div>

          {/* Mission Section */}
          <GlassCard className="mb-8">
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-glow-primary">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold mb-4 text-foreground">
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We believe every student deserves clear, reliable, and accessible career guidance.
                  Our mission is to bridge the gap between students and opportunities by providing an engaging, easy-to-understand platform that helps them make confident decisions about their future.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Vision Section */}
          <GlassCard className="mb-12">
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl shadow-glow-secondary">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold mb-4 text-foreground">
                  Our Vision
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To become the most trusted career guidance platform, empowering students to explore and choose the right career path based on their passions, skills, and dreams through innovative and interactive experiences.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Values Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <GlassCard delay={0.2}>
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Student-Centric Design
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every feature of EduWise is built with students in mind.
From easy-to-understand guidance to interactive 3D visuals,
we ensure that career exploration feels simple, engaging,
and tailored to each student's unique journey.
                </p>
              </div>
            </GlassCard>

            <GlassCard delay={0.4}>
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Premium Quality
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We provide reliable and accurate career information
that stays updated with the latest trends.
Our platform ensures students get trustworthy guidance
with a premium, modern experience.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Story Section */}
          <GlassCard>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                <h2 className="text-3xl font-display font-bold text-foreground">Our Story</h2>
              </div>
              
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
EduWise was created with a simple vision — to help students who feel lost after their 10th or 12th. 
Every year, countless students face pressure from family, friends, and society, often choosing a 
career path out of confusion rather than passion. This leads to regret, wasted time, and missed opportunities.
</p>

<p>
At EduWise, we aim to change that. By combining the power of <strong>AI-driven guidance</strong> with a  
<strong>simple, accessible platform</strong>, we make career exploration easy and reliable for every student. 
No expensive counseling sessions, no guesswork — just clear, personalized direction.
</p>

<p>
Whether it’s traditional fields like engineering and medicine or emerging careers like AI, digital marketing, 
and entrepreneurship, EduWise helps students discover paths that truly match their interests and dreams. 
Our mission is to turn confusion into clarity and give every student the confidence to shape their own future.
</p>

              </div>
            </div>
          </GlassCard>

          {/* Stats Section */}
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: "1000+", label: "Diverse streams and careers to match every dream." },
              { number: "50K+", label: "Lives transformed through clarity and direction." },
              { number: "95%", label: "Students finding the right path with confidence." },
              { number: "24/7", label: "Round-the-clock assistance for every step of your journey" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-display font-black bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;