import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import GlassCard from "@/components/3D/GlassCard";
import Scene3D from "@/components/3D/Scene3D";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from '../components/Firebase/Firebase';
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function googlelogin(){
        const provider= new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(async(result)=>{
            console.log(result)
            if(result.user){
                console.log("logged in by google");

            }
            window.location.href="/"
        })
    }
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("user successfully logged in");
     toast.success("User Registered Successfully!");
     window.location.href="/streams-courses";
      
    }catch(error){
      console.log(error.message);
      toast.error(error.message);
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 relative">
      {/* 3D Background */}
      <div className="fixed inset-0 opacity-20">
        <Scene3D />
      </div>
      
      <div className="relative z-10 py-12 px-6">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard>
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
                  <p className="text-muted-foreground">Sign in to continue your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 bg-secondary/50 backdrop-blur-lg border-white/20 focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 pr-10 bg-secondary/50 backdrop-blur-lg border-white/20 focus:border-primary"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full group bg-gradient-primary hover:shadow-glow-primary border-0 font-semibold py-3"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </form>

                <div className="text-center space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:text-primary-glow font-medium">
                      Sign up here
                    </Link>
                  </div>

                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <span className="h-px w-1/4 bg-white/20"></span>
                       <span className="text-muted-foreground text-sm">Or continue with</span>
                       <span className="h-px w-1/4 bg-white/20"></span>
                         </div>
        
                        {/* Google Button */}
                        <Button
                        onClick={googlelogin}
                           type="button"
                          className="w-full group bg-gradient-primary hover:shadow-glow-primary border-0 font-semibold py-3"
                         >
                                  
                           <span>Continue with Google</span>
                                    
                        </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    <Link to="/" className="hover:text-foreground transition-colors">
                      ← Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;