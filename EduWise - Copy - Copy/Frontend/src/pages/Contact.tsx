import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { Mail, Phone, Star, MessageCircle, Zap, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GlassCard from "@/components/3D/GlassCard";
import Scene3D from "@/components/3D/Scene3D";

const Feedback = () => {
  const { toast } = useToast();
  const [ratings, setRatings] = useState({
    design: [7],
    usability: [8],
    content: [7],
    overall: [8]
  });
  
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted! ✨",
      description: "Thank you for your valuable feedback. It helps us improve!",
    });
  };

  const faqData = [
    {
      question: "How does EduWise help with career guidance?",
      answer: "EduWise uses advanced AI algorithms to analyze your interests, skills, and academic performance to provide personalized career recommendations. We offer detailed information about 1000+ courses and career paths."
    },
    {
      question: "Is the platform free to use?",
      answer: "EduWise offers both free and premium features. Basic career exploration is free, while advanced AI-powered personalized guidance and detailed course information require a premium subscription."
    },
    {
      question: "What kind of careers can I explore?",
      answer: "You can explore traditional careers like Engineering, Medicine, Commerce, as well as new-age careers like AI/ML, Cybersecurity, Digital Marketing, Game Development, and many more across all streams."
    },
    {
      question: "How accurate are the career recommendations?",
      answer: "Our AI-powered recommendations have a 95% accuracy rate based on student feedback and career success tracking. We continuously update our algorithms with latest industry trends."
    },
    {
      question: "Can I get guidance for both 10th and 12th grade decisions?",
      answer: "Yes! EduWise provides comprehensive guidance for students after 10th grade (stream selection) and 12th grade (course and college selection), along with competitive exam preparation."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 relative">
      {/* 3D Background */}
      <div className="fixed inset-0 opacity-20">
        <Scene3D />
      </div>
      
      <div className="relative z-10 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
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
              Feedback <span className="bg-gradient-primary bg-clip-text text-transparent">Hub</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Help us improve EduWise! Share your experience and rate our platform.
            </motion.p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* LEFT COLUMN: Feedback + Success Stories */}
            <div className="space-y-8">
              {/* Rate Your Experience */}
              <GlassCard>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Star className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-display font-bold">Rate Your Experience</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Rating Sliders */}
                    {[
                      { key: 'design', label: 'Website Design', icon: '🎨' },
                      { key: 'usability', label: 'Ease of Use', icon: '⚡' },
                      { key: 'content', label: 'Content Quality', icon: '📚' },
                      { key: 'overall', label: 'Overall Experience', icon: '⭐' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="space-y-3"
                      >
                        <Label className="text-foreground font-medium flex items-center gap-2">
                          <span>{item.icon}</span>
                          {item.label}
                          <span className="ml-auto text-primary font-bold">
                            {ratings[item.key as keyof typeof ratings][0]}/10
                          </span>
                        </Label>
                        <Slider
                          value={ratings[item.key as keyof typeof ratings]}
                          onValueChange={(value) => setRatings({ ...ratings, [item.key]: value })}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full group bg-gradient-primary hover:shadow-glow-primary border-0 font-semibold py-3"
                      >
                        <Star className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                        Submit Feedback
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </GlassCard>

              {/* Success Stories Section */}
              <GlassCard delay={0.3}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Star className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-display font-bold">Success Stories</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: "Priya Sharma",
                        achievement: "IIT Delhi CSE",
                        story: "EduWise helped me choose the right stream after 10th. Now I'm studying Computer Science at IIT Delhi!",
                        rating: 5
                      },
                      {
                        name: "Arjun Patel",
                        achievement: "AIIMS MBBS",
                        story: "The career roadmap was incredibly detailed. It guided my preparation strategy for NEET perfectly.",
                        rating: 5
                      },
                      {
                        name: "Sneha Kumar",
                        achievement: "CA + MBA",
                        story: "Started with commerce stream guidance, now I'm a CA preparing for MBA. Thank you EduWise!",
                        rating: 5
                      }
                    ].map((story, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 bg-secondary/20 rounded-xl border border-white/10"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {story.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{story.name}</h4>
                            <p className="text-sm text-primary">{story.achievement}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{story.story}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: story.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* RIGHT COLUMN: FAQ + Contact */}
            <div className="space-y-8">
              {/* FAQ Section */}
              <GlassCard delay={0.4}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-display font-bold">Frequently Asked Questions</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {faqData.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border border-white/10 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                          className="w-full px-6 py-4 text-left bg-secondary/30 hover:bg-secondary/50 transition-colors duration-300 flex items-center justify-between"
                        >
                          <span className="font-medium text-foreground">{faq.question}</span>
                          {expandedFAQ === index ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary" />
                          )}
                        </button>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 py-4 bg-secondary/20"
                          >
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Contact Information */}
              <GlassCard delay={0.2}>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="h-6 w-6 text-primary animate-pulse" />
                    <h2 className="text-2xl font-display font-bold">Get in Touch</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        title: "Email",
                        details: ["hackpack2025@gmail.com", "Quick responses within 24 hours"],
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      {
                        icon: Phone,
                        title: "Phone",
                        details: ["+91 9212551255", "Mon-Fri, 9 AM - 6 PM"],
                        gradient: "from-emerald-500 to-teal-500"
                      }
                    ].map((contact, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-xl bg-secondary/30 backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.02, y: -2 }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className={`bg-gradient-to-br ${contact.gradient} p-3 rounded-xl shadow-glow-primary`}>
                          <contact.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold mb-2 text-foreground">{contact.title}</h4>
                          {contact.details.map((detail, i) => (
                            <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
