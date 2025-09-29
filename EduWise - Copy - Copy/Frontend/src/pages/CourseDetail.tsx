import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, BookOpen, TrendingUp } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - would be replaced with actual data fetching
  const courseData: Record<string, any> = {
    "engineering": {
      title: "Engineering (B.Tech/BE)",
      overview: "Engineering is a 4-year undergraduate degree program that provides students with technical knowledge and practical skills in various engineering disciplines. It combines theoretical learning with hands-on experience through laboratories, projects, and internships.",
      duration: "4 Years",
      eligibility: "12th grade with Physics, Chemistry, and Mathematics. Minimum 75% marks (65% for SC/ST). Valid JEE Main/Advanced score for top colleges.",
      careerScope: [
        "Software Engineer/Developer",
        "Mechanical Engineer", 
        "Civil Engineer",
        "Electronics Engineer",
        "Data Scientist",
        "Project Manager",
        "Research & Development",
        "Entrepreneurship"
      ]
    },
    "mbbs": {
      title: "MBBS",
      overview: "Bachelor of Medicine and Bachelor of Surgery (MBBS) is a 5.5-year professional undergraduate degree including 1 year of internship. It's the primary medical degree required to practice as a doctor.",
      duration: "5.5 Years (including 1 year internship)",
      eligibility: "12th grade with Physics, Chemistry, Biology. Minimum 50% marks (40% for SC/ST/OBC). Qualified NEET score mandatory.",
      careerScope: [
        "General Physician",
        "Specialist Doctor (after MD/MS)",
        "Surgeon",
        "Medical Researcher",
        "Hospital Administrator",
        "Public Health Officer",
        "Medical Writer",
        "Healthcare Entrepreneur"
      ]
    },
    "ai-ml": {
      title: "AI/Machine Learning",
      overview: "Artificial Intelligence and Machine Learning is a cutting-edge field that focuses on creating intelligent systems that can learn and make decisions. It combines computer science, mathematics, and domain expertise.",
      duration: "3-4 Years (B.Tech AI/ML) or 6-24 months (Certification courses)",
      eligibility: "12th with PCM for degree courses. Basic programming knowledge preferred for certification courses.",
      careerScope: [
        "AI/ML Engineer",
        "Data Scientist",
        "Research Scientist",
        "AI Product Manager",
        "Computer Vision Engineer",
        "NLP Engineer",
        "AI Consultant",
        "Robotics Engineer"
      ]
    }
  };

  const course = courseData[id || ""] || {
    title: "Course Details",
    overview: "This is a template course detail page. Detailed information about the selected course would be displayed here, including comprehensive overview, duration, eligibility criteria, and career opportunities.",
    duration: "Varies",
    eligibility: "Course-specific requirements",
    careerScope: [
      "Industry-specific opportunities",
      "Government sector jobs",
      "Private sector careers",
      "Entrepreneurship options",
      "Research opportunities"
    ]
  };

  return (
    <div className="py-12 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <Link to="/streams-courses">
          <Button variant="outline" className="mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {course.title}
          </h1>
        </div>

        <div className="grid gap-8">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {course.overview}
              </p>
            </CardContent>
          </Card>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{course.duration}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.eligibility}</p>
              </CardContent>
            </Card>
          </div>

          {/* Career Scope */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <TrendingUp className="mr-3 h-6 w-6 text-primary" />
                Career Scope & Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {course.careerScope.map((career: string, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center p-3 bg-secondary rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">
              Interested in this course?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get more personalized guidance and explore admission requirements
            </p>
            <Link to="/contact">
              <Button size="lg">Get Guidance</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;