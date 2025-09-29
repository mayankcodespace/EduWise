import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Career10 = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questions = [
    {
      id: "Interest_in_Maths",
      question: "How much are you interested in Mathematics?",
      options: ["High", "Low", "Medium"]
    },
    {
      id: "Interest_in_Science",
      question: "How much are you interested in Science?",
      options: ["High", "Low", "Medium"]
    },
    {
      id: "Interest_in_SocialScience",
      question: "How much are you interested in Social Science?",
      options: ["High", "Low", "Medium"]
    },
    {
      id: "Hobbies",
      question: "Hobbies?",
      options: ["Chess", "Coding", "Designing", "Music", "Painting", "Reading", "Sports", "Writing"]
    },
    {
      id: "Extracurricular_Activities",
      question: "Extracurricular Activities",
      options: ["Athletics", "Debate", "Dramas", "Music", "Robotics", "Science Quiz", "Sports", "None"]
    }
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8080/prediction_api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setPrediction(data.predicted_stream);
      }
    } catch (err: any) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Career Guidance - Class 10th
            </CardTitle>
            <CardDescription className="text-lg">
              Answer these questions to discover your ideal career path after 10th grade
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {index + 1}. {q.question}
                </h3>
                <Select onValueChange={(value) => handleAnswerChange(q.id, value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {q.options.map((option, idx) => (
                      <SelectItem key={idx} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              className="w-full mt-8 h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              disabled={Object.keys(answers).length < questions.length || loading}
            >
              {loading ? "Predicting..." : "Predicted Stream"}
            </Button>

            {prediction && (
              <p className="mt-4 text-center text-xl font-semibold text-foreground">
                🎯 Predicted Stream: {prediction}
              </p>
            )}
            {error && (
              <p className="mt-4 text-center text-red-500 font-semibold">
                ⚠️ {error}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Career10;
