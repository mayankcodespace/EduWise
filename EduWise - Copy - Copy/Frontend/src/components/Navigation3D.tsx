import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, Sparkles, User} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { auth, db} from '../components/Firebase/Firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import { doc, DocumentReference, getDoc } from "firebase/firestore";

interface UserDetails {
  email: string;
  // Add other user properties as needed
  name?: string;
  uid?: string;
}

const Navigation3D = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const fetchUserData = async (): Promise<void> => {
    onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      console.log(user);

      if (user) {
        try {
          const docRef: DocumentReference = doc(db, "Users", user.uid);
          console.log("DocRef:", docRef);
          
          // Fetch the document data
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails({
              email: user.email || '',
              name: userData.name || '',
              uid: user.uid,
              ...userData
            });
          } else {
            // If no document exists, use basic user info from auth
            setUserDetails({
              email: user.email || '',
              uid: user.uid
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to basic user info
          setUserDetails({
            email: user.email || '',
            uid: user.uid
          });
        }
      } else {
        setUserDetails(null);
      }
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/streams-courses", label: "Streams & Courses" },
    { to: "/about", label: "About" },
    { to: "/feedback", label: "Feedback" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-primary/30 animate-ping" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                EduWise
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }, index) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === to
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {label}
                  {location.pathname === to && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                      layoutId="activeLink"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Auth Section - Profile or Sign In/Up */}
            {userDetails ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-white/20"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <div className="px-2 py-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {userDetails.email}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <Button
                    variant="ghost"
                    className="px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    className="px-6 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu + Profile/Auth */}
          <div className="flex items-center space-x-2 md:hidden">
            {userDetails ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-white/20"
                  >
                    <User className="h-5 w-5 text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <div className="px-2 py-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {userDetails.email}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs px-3 py-2 hover:bg-primary/5 hover:text-primary"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="text-xs px-3 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                className="backdrop-blur-lg bg-white/5 border-white/20"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation3D;