import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Choose Your Path
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your current education level to get personalized career guidance
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/career10')}
            className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Class 10th
          </Button>
          
          <Button
            onClick={() => navigate('/career12')}
            className="w-full h-16 text-xl font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Class 12th
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Choose;