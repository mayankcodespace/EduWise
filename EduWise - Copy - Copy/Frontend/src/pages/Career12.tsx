import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Career12 = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questions = [
    {
      id: "Stream",
      question: "What stream did you choose in 11th-12th?",
      options: [
        "Science (PCM - Physics, Chemistry, Maths)",
        "Science (PCB - Physics, Chemistry, Biology)",
        "Commerce (with Maths)",
        "Commerce (without Maths)",
        "Arts/Humanities"
      ]
    },
    {
      id: "Core Subjects",
      question: "Your Core subjects?",
      options: [
        "Accounts, Business Studies, Economics",
        "History, Pol. Science, Sociology",
        "Physics, Chemistry, Biology",
        "Physics, Chemistry, Math",
        "Physics, Chemistry, Math, Biology",
      ]
    },
    {
      id: "Optional Subject",
      question: "Your Optional subjects?",
      options: [
        "Biology",
        "Comp science",
        "Enterprenuership",
        "Fine Arts",
        "Information Practices",
        "Mathematics",
        "Physical Education",
        "Psychology",
        "Sociology",
      ]
    },
    {
      id: "Hobbies",
      question: "Hobbies?",
      options: [
        "Chess",
        "Coding",
        "Designing",
        "Music",
        "Painting",
        "Reading",
        "Sports",
        "Photography",
        "Poetry",
        "Writing",
      ]
    },
    {
      id: "Extracurricular Activities",
      question: "Extracurricular Activities",
      options: [
        "Athletics",
        "Debate",
        "Dramas",
        "Music",
        "Robotics",
        "Science Quiz",
        "Sports",
        "None",
      ]
    },
    {
      id: "Preferred Career",
      question: "Preferred Career",
      options: [ 
        "Artist", 
        "Biotechnologist", 
        "Business Manager", 
        "Chartered Accountant", 
        "Data Scientist", 
        "Doctor", 
        "Economist", 
        "Engineer", 
        "Entrepreneur", 
        "Financial Analyst", 
        "Historian", 
        "IT Specialist", 
        "Journalist",
        "Lawyer",
        "Psychologist",
        "Researcher",
        "Social Worker",
        "Sports Scientist",
        "Teacher",
     ]
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
      const response = await fetch("http://127.0.0.1:8081/prediction_api", {
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
        setPrediction(data.predicted_courses || []);
      }
    } catch (err: any) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
              Career Guidance - Class 12th
            </CardTitle>
            <CardDescription className="text-lg">
              Answer these questions to discover your ideal career path after 12th grade
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
              className="w-full mt-8 h-12 text-lg font-semibold bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary"
              disabled={Object.keys(answers).length < questions.length || loading}
            >
              {loading ? "Predicting..." : "Get Career Recommendations"}
            </Button>

            {prediction && prediction.length > 0 && (
              <div className="mt-4 text-center text-xl font-semibold text-foreground">
                🎯 Predicted Courses: {prediction.join(", ")}
              </div>
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

export default Career12;
