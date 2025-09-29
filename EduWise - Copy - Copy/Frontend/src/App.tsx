import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation3D from "./components/Navigation3D";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import StreamsCourses from "./pages/StreamsCourses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Feedback from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

import Choose from "./pages/Choose";
import PrivateRoute from "./components/PrivateRoute";
import Career10 from "./pages/Career10";
import Career12 from "./pages/Career12";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <Navigation3D />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/streams-courses" element={<PrivateRoute><StreamsCourses /></PrivateRoute>} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/career10" element={<Career10 />} />
              <Route path="/career12" element={<Career12 />} />
              <Route path="/choose" element={<PrivateRoute><Choose/></PrivateRoute>}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
