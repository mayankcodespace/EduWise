import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CourseCard3D from '../components/CourseCard3D';
import CareerRoadmap from '../components/CareerRoadmap';
import Chatbot from "../components/Chatbot";
import { Link } from 'lucide-react';

interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  type: 'education' | 'skill' | 'career';
}

interface Course {
  id: string;
  title: string;
  description: string;
  careers: string[];
  entranceExams: string[];
  colleges: string[];
  roadmaps: {
    [career: string]: RoadmapStep[];
  };
}

interface CourseCategory {
  title: string;
  gradient: string;
  courses: Course[];
}

const courseCategories: CourseCategory[] = [
  {
    title: "Science Stream (PCM/PCB/PCMB)",
    gradient: "from-purple-500 to-pink-500",
    courses: [
      {
        id: "btech-engineering",
        title: "B.Tech/B.E (Engineering)",
        description: "4-year engineering degree with specializations in Computer Science, Mechanical, Civil, Electronics, Chemical, Aerospace, etc.",
        careers: ["Software Engineer", "Data Scientist", "Civil Engineer", "Mechanical Engineer", "Electronics Engineer", "Aerospace Engineer"],
        entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "SRMJEEE", "State CETs"],
        colleges: ["IIT Delhi", "IIT Bombay", "NIT Trichy", "BITS Pilani", "VIT Vellore"],
        roadmaps: {
          "Software Engineer": [
            { title: "Class 12", description: "Science stream with Mathematics and Computer Science (preferred)", duration: "2 years", type: "education" },
            { title: "B.Tech in Computer Science/IT", description: "Bachelor's degree in engineering", duration: "4 years", type: "education" },
            { title: "Programming Skills", description: "Learn C, C++, Java, Python, Data Structures & Algorithms", duration: "1-2 years", type: "skill" },
            { title: "Internships", description: "Gain experience by working on real-world projects", duration: "6 months - 1 year", type: "career" },
            { title: "Competitive Coding", description: "Participate in coding competitions like Codeforces, LeetCode", duration: "Ongoing", type: "skill" },
            { title: "Software Engineer", description: "Work in IT companies, salary range 4-20 LPA", duration: "Career", type: "career" }
          ],
          "Data Scientist": [
            { title: "Class 12", description: "Science stream with Mathematics and Computer Science", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "B.Sc Computer Science / B.Tech / BCA", duration: "3-4 years", type: "education" },
            { title: "Data Analysis Skills", description: "Learn Python, SQL, Excel, and statistics", duration: "1 year", type: "skill" },
            { title: "Machine Learning", description: "Learn ML algorithms, data visualization tools", duration: "1 year", type: "skill" },
            { title: "Internships & Projects", description: "Build data science portfolio", duration: "6 months", type: "career" },
            { title: "Data Scientist", description: "Work with AI/ML and analytics teams, 6-25 LPA", duration: "Career", type: "career" }
          ],
          "Civil Engineer": [
            { title: "Class 12", description: "Science stream with Physics, Chemistry, Mathematics", duration: "2 years", type: "education" },
            { title: "B.Tech in Civil Engineering", description: "Undergraduate program in civil engineering", duration: "4 years", type: "education" },
            { title: "Design Software Skills", description: "Learn AutoCAD, STAAD Pro, Revit", duration: "1 year", type: "skill" },
            { title: "Internships", description: "Work on-site and gain practical experience", duration: "6 months - 1 year", type: "career" },
            { title: "Optional M.Tech", description: "Specialize in Structural, Environmental, or Geotechnical Engineering", duration: "2 years", type: "education" },
            { title: "Civil Engineer", description: "Jobs in construction companies, government, private sector", duration: "Career", type: "career" }
          ],
          "Mechanical Engineer": [
            { title: "Class 12", description: "Science stream with Physics, Chemistry, Mathematics", duration: "2 years", type: "education" },
            { title: "B.Tech in Mechanical Engineering", description: "Bachelor's degree in mechanical engineering", duration: "4 years", type: "education" },
            { title: "Mechanical Design Tools", description: "Learn CAD, CAM, SolidWorks", duration: "1 year", type: "skill" },
            { title: "Internships", description: "Hands-on experience in manufacturing or automobile sectors", duration: "6 months - 1 year", type: "career" },
            { title: "Optional M.Tech", description: "Specialize in Robotics, Thermal, or Manufacturing Engineering", duration: "2 years", type: "education" },
            { title: "Mechanical Engineer", description: "Work in manufacturing, design, robotics sectors", duration: "Career", type: "career" }
          ],
          "Electronics Engineer": [
            { title: "Class 12", description: "Science stream with Physics, Chemistry, Mathematics", duration: "2 years", type: "education" },
            { title: "B.Tech in Electronics & Communication", description: "Bachelor's degree in ECE", duration: "4 years", type: "education" },
            { title: "Electronics Tools", description: "Learn MATLAB, PCB Design, VLSI concepts", duration: "1 year", type: "skill" },
            { title: "Internships", description: "Work with electronics companies or embedded systems firms", duration: "6 months - 1 year", type: "career" },
            { title: "Optional M.Tech", description: "Specialize in VLSI, IoT, or Embedded Systems", duration: "2 years", type: "education" },
            { title: "Electronics Engineer", description: "Jobs in electronics, telecom, and chip design companies", duration: "Career", type: "career" }
          ],
          "Aerospace Engineer": [
            { title: "Class 12", description: "Science stream with Physics, Chemistry, Mathematics", duration: "2 years", type: "education" },
            { title: "B.Tech in Aerospace Engineering", description: "Bachelor's program in aerospace engineering", duration: "4 years", type: "education" },
            { title: "Aerodynamics & CAD Tools", description: "Learn CATIA, ANSYS, SolidWorks for aircraft design", duration: "1 year", type: "skill" },
            { title: "Internships", description: "Gain experience at aerospace companies like ISRO, DRDO, HAL", duration: "6 months - 1 year", type: "career" },
            { title: "Optional M.Tech", description: "Specialize in Aerodynamics or Space Technology", duration: "2 years", type: "education" },
            { title: "Aerospace Engineer", description: "Work in aviation, defense, and research sectors", duration: "Career", type: "career" }
          ]
        }
      },
      {
        id: "mbbs-medical",
        title: "MBBS/BDS/BAMS/BHMS",
        description: "Medical courses including MBBS (5.5 years), BDS (5 years), BAMS (5.5 years), BHMS (5.5 years)",
        careers: ["Doctor (MBBS)", "Dentist", "Ayurvedic Doctor", "Homeopathic Doctor", "Medical Researcher", "Public Health Officer"],
        entranceExams: ["NEET", "AIIMS", "JIPMER", "State NEET"],
        colleges: ["AIIMS Delhi", "AFMC Pune", "KMC Manipal", "CMC Vellore", "MAMC Delhi"],
        roadmaps: {
          "Doctor (MBBS)": [
            { title: "Class 12 PCB", description: "Physics, Chemistry, Biology with 50%+ marks", duration: "2 years", type: "education" },
            { title: "NEET Preparation", description: "Qualify NEET entrance exam with good rank", duration: "1-2 years", type: "skill" },
            { title: "MBBS", description: "Bachelor of Medicine and Bachelor of Surgery", duration: "5.5 years", type: "education" },
            { title: "Medical Internship", description: "1-year compulsory rotating internship", duration: "1 year", type: "career" },
            { title: "PG Entrance", description: "NEET PG for specialization (optional)", duration: "1 year prep", type: "skill" },
            { title: "Medical Practice", description: "Start practice or pursue specialization, 3-50 LPA", duration: "Career", type: "career" }
          ],
          "Dentist": [
            { title: "Class 12 PCB", description: "Physics, Chemistry, Biology with minimum 50% marks", duration: "2 years", type: "education" },
            { title: "NEET Preparation", description: "Qualify NEET exam for admission to BDS", duration: "1-2 years", type: "skill" },
            { title: "BDS", description: "Bachelor of Dental Surgery", duration: "5 years", type: "education" },
            { title: "Dental Internship", description: "Hands-on clinical practice", duration: "1 year", type: "career" },
            { title: "MDS (Optional)", description: "Master's in Dental Surgery for specialization", duration: "3 years", type: "education" },
            { title: "Dentist Practice", description: "Start private practice or join a hospital, 3-20 LPA", duration: "Career", type: "career" }
          ],
          "Ayurvedic Doctor": [
            { title: "Class 12 PCB", description: "Physics, Chemistry, Biology with minimum 50% marks", duration: "2 years", type: "education" },
            { title: "NEET Preparation", description: "Qualify NEET for admission into BAMS", duration: "1 year", type: "skill" },
            { title: "BAMS", description: "Bachelor of Ayurvedic Medicine and Surgery", duration: "5.5 years", type: "education" },
            { title: "Internship", description: "Practical exposure in Ayurvedic hospitals", duration: "1 year", type: "career" },
            { title: "MD/MS (Optional)", description: "Master's degree for specialization", duration: "3 years", type: "education" },
            { title: "Ayurvedic Practice", description: "Work in clinics, hospitals or start your own practice", duration: "Career", type: "career" }
          ],
          "Homeopathic Doctor": [
            { title: "Class 12 PCB", description: "Physics, Chemistry, Biology with minimum 50% marks", duration: "2 years", type: "education" },
            { title: "Entrance Exam", description: "Qualify entrance exam for BHMS admission", duration: "1 year", type: "skill" },
            { title: "BHMS", description: "Bachelor of Homeopathic Medicine and Surgery", duration: "5.5 years", type: "education" },
            { title: "Internship", description: "Hands-on experience with patients", duration: "1 year", type: "career" },
            { title: "MD (Optional)", description: "Master's in Homeopathy for specialization", duration: "3 years", type: "education" },
            { title: "Homeopathic Practice", description: "Start private clinic or join homeopathy centers", duration: "Career", type: "career" }
          ],
          "Medical Researcher": [
            { title: "MBBS/B.Sc", description: "Medical degree or Life Sciences background", duration: "4-5.5 years", type: "education" },
            { title: "M.Sc/M.D", description: "Master's in Medical Research or Doctor of Medicine", duration: "2-3 years", type: "education" },
            { title: "Ph.D", description: "Doctoral research in medical sciences", duration: "3-5 years", type: "education" },
            { title: "Research Experience", description: "Work in research labs, publish papers", duration: "2-4 years", type: "career" },
            { title: "Medical Researcher", description: "Research in pharmaceutical companies, hospitals", duration: "Career", type: "career" }
          ],
          "Public Health Officer": [
            { title: "Class 12 PCB", description: "Physics, Chemistry, Biology with minimum 50% marks", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "BPH (Bachelor of Public Health) or MBBS", duration: "3-5 years", type: "education" },
            { title: "Master's in Public Health (Optional)", description: "Specialize in epidemiology or healthcare management", duration: "2 years", type: "education" },
            { title: "Internships & Field Work", description: "Gain real-world public health experience", duration: "6 months - 1 year", type: "career" },
            { title: "Public Health Officer Role", description: "Work with government or NGOs, 4-15 LPA", duration: "Career", type: "career" }
          ]
        }
      }
    ]
  },
  {
    title: "Commerce Stream",
    gradient: "from-blue-500 to-cyan-500",
    courses: [
      {
        id: "bcom-accounting",
        title: "B.Com (Accounting & Finance)",
        description: "3-year undergraduate degree in commerce, accounting, finance, and business studies",
        careers: ["Accountant", "Financial Analyst", "Tax Consultant", "Banking Professional", "Auditor"],
        entranceExams: ["CUET", "DU JAT", "IPU CET", "University Entrance Tests"],
        colleges: ["SRCC Delhi", "LSR Delhi", "Loyola Chennai", "Christ University", "Narsee Monjee"],
        roadmaps: {
          "Accountant": [
            { title: "Class 12 Commerce", description: "Commerce stream with Accountancy and Mathematics", duration: "2 years", type: "education" },
            { title: "B.Com", description: "Bachelor of Commerce with focus on accounting", duration: "3 years", type: "education" },
            { title: "Accounting Software", description: "Learn Tally, SAP, QuickBooks", duration: "6 months", type: "skill" },
            { title: "CA/CMA (Optional)", description: "Professional certification in accounting", duration: "3-4 years", type: "education" },
            { title: "Internship", description: "Work with accounting firms or finance departments", duration: "6 months", type: "career" },
            { title: "Accountant", description: "Handle financial records and statements, 3-15 LPA", duration: "Career", type: "career" }
          ],
          "Financial Analyst": [
            { title: "Class 12 Commerce", description: "Commerce with Mathematics and Economics", duration: "2 years", type: "education" },
            { title: "B.Com/BBA", description: "Bachelor's in Commerce or Business Administration", duration: "3 years", type: "education" },
            { title: "Financial Modeling", description: "Learn Excel, financial analysis, valuation techniques", duration: "6 months", type: "skill" },
            { title: "CFA/FRM (Optional)", description: "Professional certification in financial analysis", duration: "2-3 years", type: "education" },
            { title: "Internship", description: "Work in investment firms, banks, corporate finance", duration: "6 months", type: "career" },
            { title: "Financial Analyst", description: "Analyze investments and financial data, 4-20 LPA", duration: "Career", type: "career" }
          ],
          "Tax Consultant": [
            { title: "Class 12 Commerce", description: "Commerce stream with Accountancy", duration: "2 years", type: "education" },
            { title: "B.Com", description: "Bachelor of Commerce", duration: "3 years", type: "education" },
            { title: "Taxation Knowledge", description: "Learn Income Tax, GST, Corporate Tax laws", duration: "1 year", type: "skill" },
            { title: "CA/CS (Optional)", description: "Professional qualification in taxation", duration: "3-4 years", type: "education" },
            { title: "Practice Experience", description: "Work with tax consultants, CA firms", duration: "1 year", type: "career" },
            { title: "Tax Consultant", description: "Provide tax advisory services, 3-25 LPA", duration: "Career", type: "career" }
          ],
          "Banking Professional": [
            { title: "Class 12 Any Stream", description: "Any stream with good aptitude", duration: "2 years", type: "education" },
            { title: "Graduate Degree", description: "Any bachelor's degree", duration: "3 years", type: "education" },
            { title: "Banking Exam Prep", description: "Prepare for IBPS, SBI, RBI exams", duration: "1 year", type: "skill" },
            { title: "Banking Training", description: "Complete bank's training program after selection", duration: "6 months - 1 year", type: "education" },
            { title: "Banking Experience", description: "Work in various banking operations", duration: "2-5 years", type: "career" },
            { title: "Banking Professional", description: "Career in public/private sector banks, 4-20 LPA", duration: "Career", type: "career" }
          ],
          "Auditor": [
            { title: "Class 12 Commerce", description: "Commerce stream with Accountancy", duration: "2 years", type: "education" },
            { title: "B.Com", description: "Bachelor of Commerce with accounting focus", duration: "3 years", type: "education" },
            { title: "Auditing Standards", description: "Learn auditing principles, standards, procedures", duration: "6 months", type: "skill" },
            { title: "CA Articleship", description: "3-year articleship under Chartered Accountant", duration: "3 years", type: "career" },
            { title: "CA Qualification", description: "Complete Chartered Accountancy", duration: "4-5 years total", type: "education" },
            { title: "Auditor", description: "Internal/external auditing in firms, companies, 5-30 LPA", duration: "Career", type: "career" }
          ]
        }
      },
      {
        id: "bba-management",
        title: "BBA (Business Administration)",
        description: "3-year undergraduate program in business management, covering marketing, finance, HR, and operations",
        careers: ["Business Analyst", "Marketing Executive", "HR Professional", "Operations Manager", "Entrepreneur", "Management Trainee"],
        entranceExams: ["CUET", "DU JAT", "NPAT", "UGAT", "IPMAT", "SET"],
        colleges: ["FMS Delhi", "JBIMS Mumbai", "Christ University", "NMIMS Mumbai", "Symbiosis Pune"],
        roadmaps: {
          "Business Analyst": [
            { title: "Class 12 Any Stream", description: "Any stream with good analytical skills", duration: "2 years", type: "education" },
            { title: "BBA/B.Com", description: "Bachelor's in Business Administration or Commerce", duration: "3 years", type: "education" },
            { title: "Analytical Tools", description: "Learn Excel, SQL, Tableau, Power BI", duration: "6 months", type: "skill" },
            { title: "Internship", description: "Work as intern in business analysis roles", duration: "6 months", type: "career" },
            { title: "MBA (Optional)", description: "Master's in Business Administration", duration: "2 years", type: "education" },
            { title: "Business Analyst", description: "Analyze business processes and data, 4-18 LPA", duration: "Career", type: "career" }
          ],
          "Marketing Executive": [
            { title: "Class 12 Any Stream", description: "Any stream with good communication", duration: "2 years", type: "education" },
            { title: "BBA/B.Com", description: "Bachelor's degree with marketing focus", duration: "3 years", type: "education" },
            { title: "Digital Marketing", description: "Learn SEO, SEM, social media marketing, content creation", duration: "6 months", type: "skill" },
            { title: "Marketing Internship", description: "Gain hands-on marketing experience", duration: "6 months", type: "career" },
            { title: "Brand Management", description: "Learn brand strategy, campaign management", duration: "1 year", type: "skill" },
            { title: "Marketing Executive", description: "Develop and execute marketing strategies, 3-15 LPA", duration: "Career", type: "career" }
          ],
          "HR Professional": [
            { title: "Class 12 Any Stream", description: "Any stream with good interpersonal skills", duration: "2 years", type: "education" },
            { title: "BBA/BA Psychology", description: "Bachelor's in Business or Psychology", duration: "3 years", type: "education" },
            { title: "HR Specialization", description: "Learn recruitment, training, labor laws, HRIS", duration: "6 months", type: "skill" },
            { title: "HR Internship", description: "Work in HR departments", duration: "6 months", type: "career" },
            { title: "MBA HR (Optional)", description: "Master's in Human Resource Management", duration: "2 years", type: "education" },
            { title: "HR Professional", description: "Manage human resources functions, 3-20 LPA", duration: "Career", type: "career" }
          ],
          "Operations Manager": [
            { title: "Class 12 Any Stream", description: "Any stream with logical thinking", duration: "2 years", type: "education" },
            { title: "BBA/B.Tech", description: "Bachelor's in Business Administration or Engineering", duration: "3-4 years", type: "education" },
            { title: "Operations Knowledge", description: "Learn supply chain, logistics, process optimization", duration: "1 year", type: "skill" },
            { title: "Operations Experience", description: "Work in operations roles, gain leadership experience", duration: "2-3 years", type: "career" },
            { title: "Six Sigma/Lean", description: "Get certified in process improvement methodologies", duration: "6 months", type: "education" },
            { title: "Operations Manager", description: "Manage business operations and processes, 5-25 LPA", duration: "Career", type: "career" }
          ],
          "Entrepreneur": [
            { title: "Class 12 Any Stream", description: "Any stream with business acumen", duration: "2 years", type: "education" },
            { title: "BBA/Any Degree", description: "Bachelor's degree (business preferred)", duration: "3 years", type: "education" },
            { title: "Business Skills", description: "Learn business planning, finance, marketing, legal aspects", duration: "1 year", type: "skill" },
            { title: "Business Plan", description: "Develop comprehensive business plan and model", duration: "6 months", type: "skill" },
            { title: "Startup Launch", description: "Start and run your own business", duration: "1-2 years", type: "career" },
            { title: "Entrepreneur", description: "Build and scale your own business, Variable income", duration: "Career", type: "career" }
          ],
          "Management Trainee": [
            { title: "Class 12 Any Stream", description: "Any stream with good academic record", duration: "2 years", type: "education" },
            { title: "BBA/Any Graduate", description: "Bachelor's degree from reputed college", duration: "3 years", type: "education" },
            { title: "Leadership Skills", description: "Develop management and leadership capabilities", duration: "6 months", type: "skill" },
            { title: "Campus Placements", description: "Get placed through campus recruitment", duration: "6 months", type: "career" },
            { title: "Management Training", description: "Complete company's management trainee program", duration: "1-2 years", type: "education" },
            { title: "Management Role", description: "Progress to management positions, 4-25 LPA", duration: "Career", type: "career" }
          ]
        }
      },
    ]
  },
  {
    title: "Arts/Humanities Stream",
    gradient: "from-emerald-500 to-teal-500",
    courses: [
      {
        id: "ba-various",
        title: "B.A (Various Specializations)",
        description: "History, Geography, Political Science, Literature, Psychology, Sociology, Philosophy",
        careers: ["Civil Servant", "Journalist", "Teacher", "Social Worker", "Content Writer", "Diplomat", "Historian", "Career Selection"],
        entranceExams: ["CUET", "University Entrance Tests", "JNU Entrance", "DU JAT"],
        colleges: ["JNU", "Delhi University", "BHU", "JMI", "Presidency College"],
        roadmaps: {
          "Civil Servant": [
            { title: "Class 12", description: "Any stream (Humanities preferred)", duration: "2 years", type: "education" },
            { title: "B.A", description: "Bachelor's in Arts/Humanities", duration: "3 years", type: "education" },
            { title: "Optional Master's", description: "M.A in chosen subject (optional)", duration: "2 years", type: "education" },
            { title: "UPSC Preparation", description: "Prepare for civil services examination", duration: "1-3 years", type: "skill" },
            { title: "UPSC Prelims & Mains", description: "Clear prelims and mains examination", duration: "1 year", type: "skill" },
            { title: "Interview & Training", description: "Interview and training at LBSNAA", duration: "1-2 years", type: "skill" },
            { title: "Civil Services", description: "IAS/IPS/IFS administrative role, Grade Pay", duration: "Career", type: "career" }
          ],
          "Journalist": [
            { title: "B.A/B.A Journalism", description: "Bachelor's degree with good communication", duration: "3 years", type: "education" },
            { title: "Mass Communication", description: "Diploma/Degree in Journalism & Mass Comm", duration: "1-3 years", type: "education" },
            { title: "Writing Skills", description: "Develop writing, reporting, research skills", duration: "1-2 years", type: "skill" },
            { title: "Internships", description: "Work with newspapers, media organizations", duration: "6-12 months", type: "career" },
            { title: "Reporter/Correspondent", description: "Start as junior reporter or correspondent", duration: "2-3 years", type: "career" },
            { title: "Senior Journalist", description: "Senior correspondent, editor, 3-20 LPA", duration: "Career", type: "career" }
          ],
          "Teacher": [
            { title: "Class 12", description: "Any stream depending on teaching subject", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "B.A, B.Sc, or B.Com depending on subject", duration: "3 years", type: "education" },
            { title: "B.Ed", description: "Bachelor of Education for teaching qualification", duration: "2 years", type: "education" },
            { title: "Internship/Practice Teaching", description: "Hands-on teaching experience in schools", duration: "6 months", type: "career" },
            { title: "TET/CTET Exam", description: "Clear state or central teacher eligibility test", duration: "6 months", type: "skill" },
            { title: "Teacher", description: "Full-time teaching role, 3-12 LPA", duration: "Career", type: "career" }
          ],
          "Social Worker": [
            { title: "Class 12", description: "Any stream with interest in social causes", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "B.S.W or B.A in Sociology or Social Work", duration: "3 years", type: "education" },
            { title: "Volunteering", description: "Gain experience with NGOs or social groups", duration: "Ongoing", type: "career" },
            { title: "Master's Degree", description: "M.S.W or specialization in social development", duration: "2 years", type: "education" },
            { title: "Internship", description: "Work with government or non-profit organizations", duration: "6 months", type: "career" },
            { title: "Social Worker", description: "Work in NGOs, CSR, or government, 3-15 LPA", duration: "Career", type: "career" }
          ],
          "Content Writer": [
            { title: "Class 12", description: "Any stream with good writing skills", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "Preferably English, Journalism, or Mass Comm", duration: "3 years", type: "education" },
            { title: "Writing Skills", description: "Learn creative, technical, and SEO writing", duration: "6 months", type: "skill" },
            { title: "Portfolio Building", description: "Create and showcase writing samples", duration: "Ongoing", type: "skill" },
            { title: "Internship/Freelancing", description: "Work with blogs, companies, or agencies", duration: "6-12 months", type: "career" },
            { title: "Content Writer", description: "Full-time role or freelance career, 3-12 LPA", duration: "Career", type: "career" }
          ],
          "Diplomat": [
            { title: "Class 12", description: "Any stream (Humanities preferred)", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "B.A in Political Science, IR, or similar", duration: "3 years", type: "education" },
            { title: "UPSC Preparation", description: "Prepare for Indian Foreign Service (IFS) exam", duration: "2-3 years", type: "skill" },
            { title: "Clear UPSC Exam", description: "Qualify through UPSC Civil Services exam", duration: "1 year", type: "skill" },
            { title: "Foreign Service Training", description: "Training at Sushma Swaraj Institute of Foreign Service", duration: "1 year", type: "career" },
            { title: "Diplomat", description: "Represent India internationally, 10-60 LPA", duration: "Career", type: "career" }
          ],
          "Historian": [
            { title: "Class 12", description: "Any stream (Humanities preferred)", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "B.A in History or Archaeology", duration: "3 years", type: "education" },
            { title: "Master's Degree", description: "M.A in History or Ancient Studies", duration: "2 years", type: "education" },
            { title: "Research Skills", description: "Learn historical research, archiving, and writing", duration: "1-2 years", type: "skill" },
            { title: "Ph.D (Optional)", description: "Doctorate for advanced research roles", duration: "3-5 years", type: "education" },
            { title: "Historian", description: "Work in museums, research, or teaching, 4-15 LPA", duration: "Career", type: "career" }
          ],
          "Career Selection": [
            { title: "Self Assessment", description: "Identify interests, strengths, and aptitudes", duration: "1 month", type: "skill" },
            { title: "Career Exploration", description: "Research various career options and industries", duration: "2-3 months", type: "skill" },
            { title: "Educational Planning", description: "Choose appropriate courses and colleges", duration: "1 month", type: "education" },
            { title: "Skill Development", description: "Build relevant skills for chosen career path", duration: "6-12 months", type: "skill" },
            { title: "Networking", description: "Connect with professionals in your field", duration: "Ongoing", type: "career" },
            { title: "Career Launch", description: "Start your professional journey", duration: "Career", type: "career" }
          ]
        }
      },
      {
        id: "journalism",
        title: "Journalism & Mass Communication",
        description: "3-year degree focusing on media, communication, journalism, advertising, PR",
        careers: ["Journalist", "News Reporter", "Content Creator", "Media Producer", "PR Executive", "Ad Film Maker"],
        entranceExams: ["CUET", "IIMC Entrance", "Symbiosis SET", "MICAT", "Xavier's Entrance"],
        colleges: ["IIMC Delhi", "Symbiosis Pune", "Xavier's Mumbai", "AJK MCRC", "Mudra Institute"],
        roadmaps: {
          "Journalist": [
            { title: "Class 12", description: "Any stream with strong communication and writing skills", duration: "2 years", type: "education" },
            { title: "B.A Journalism", description: "Bachelor's in Journalism or Mass Communication", duration: "3 years", type: "education" },
            { title: "Internships", description: "Hands-on experience with newspapers or news channels", duration: "6 months", type: "career" },
            { title: "Writing & Reporting Skills", description: "Develop news reporting, research, and editing skills", duration: "1 year", type: "skill" },
            { title: "Entry-Level Role", description: "Start as junior journalist or copy editor", duration: "1-2 years", type: "career" },
            { title: "Journalist", description: "Senior correspondent, editor, 3-20 LPA", duration: "Career", type: "career" }
          ],
          "News Reporter": [
            { title: "Class 12", description: "Any stream with good communication skills", duration: "2 years", type: "education" },
            { title: "Journalism Degree", description: "Bachelor's in Journalism & Mass Communication", duration: "3 years", type: "education" },
            { title: "Media Skills", description: "Reporting, camera work, editing, anchoring", duration: "1-2 years", type: "skill" },
            { title: "Internships", description: "Work with news channels, newspapers", duration: "6 months", type: "career" },
            { title: "Junior Reporter", description: "Start as trainee or junior reporter", duration: "1-2 years", type: "career" },
            { title: "News Reporter", description: "Field reporter, news anchor, 2-15 LPA", duration: "Career", type: "career" }
          ],
          "Content Creator": [
            { title: "Class 12", description: "Any stream with interest in digital media", duration: "2 years", type: "education" },
            { title: "Bachelor's Degree", description: "Preferably Mass Comm, Digital Media, or related", duration: "3 years", type: "education" },
            { title: "Content Creation Skills", description: "Video editing, photography, storytelling", duration: "1 year", type: "skill" },
            { title: "Social Media Growth", description: "Build a personal brand through YouTube, Instagram, etc.", duration: "Ongoing", type: "career" },
            { title: "Collaborations", description: "Work with brands or agencies for sponsored content", duration: "Ongoing", type: "career" },
            { title: "Content Creator", description: "Independent creator or influencer, income varies", duration: "Career", type: "career" }
          ],
          "Media Producer": [
            { title: "Class 12", description: "Any stream with creativity and storytelling interest", duration: "2 years", type: "education" },
            { title: "Bachelor's in Media", description: "Mass Communication or Film Production degree", duration: "3 years", type: "education" },
            { title: "Production Skills", description: "Editing, direction, scriptwriting, cinematography", duration: "1-2 years", type: "skill" },
            { title: "Internship", description: "Work with media houses, studios, or production teams", duration: "6 months", type: "career" },
            { title: "Assistant Producer", description: "Start as assistant in production house", duration: "1-2 years", type: "career" },
            { title: "Media Producer", description: "Lead production for TV, films, or digital content, 4-30 LPA", duration: "Career", type: "career" }
          ],
          "PR Executive": [
            { title: "Class 12", description: "Any stream with focus on communication skills", duration: "2 years", type: "education" },
            { title: "B.A Communication", description: "Bachelor's in Public Relations, Journalism, or related field", duration: "3 years", type: "education" },
            { title: "PR Skills", description: "Media relations, brand building, crisis management", duration: "1 year", type: "skill" },
            { title: "Internship", description: "Work in PR firms or corporate communications", duration: "6 months", type: "career" },
            { title: "Junior PR Executive", description: "Entry-level role handling client accounts", duration: "1-2 years", type: "career" },
            { title: "PR Executive", description: "Lead PR campaigns, manage brand image, 3-18 LPA", duration: "Career", type: "career" }
          ],
          "Ad Film Maker": [
            { title: "Class 12", description: "Any stream with creative interest in filmmaking", duration: "2 years", type: "education" },
            { title: "Bachelor's in Film/Media", description: "Degree in Film Production or Mass Communication", duration: "3 years", type: "education" },
            { title: "Creative Skills", description: "Storyboarding, directing, cinematography", duration: "1-2 years", type: "skill" },
            { title: "Internship", description: "Hands-on experience in ad production houses", duration: "6 months", type: "career" },
            { title: "Assistant Director", description: "Work under senior directors to gain experience", duration: "1-2 years", type: "career" },
            { title: "Ad Film Maker", description: "Direct advertisements and brand campaigns, 5-40 LPA", duration: "Career", type: "career" }
          ]
        }
      }
    ]
  },
  {
    title: "Vocational & Skill-Based Courses",
    gradient: "from-orange-500 to-red-500",
    courses: [
      {
        id: "iti-polytechnic",
        title: "ITI/Polytechnic Courses",
        description: "Technical skill courses: ITI (6 months-2 years), Polytechnic Diploma (3 years)",
        careers: ["Technician", "Supervisor", "Quality Inspector", "Machine Operator", "Maintenance Engineer"],
        entranceExams: ["State ITI Entrance", "Polytechnic Entrance", "JEE Main (Diploma)", "State CETs"],
        colleges: ["Government ITIs", "Government Polytechnics", "Private Technical Institutes"],
        roadmaps: {
          "Technician": [
            { title: "Class 10/12", description: "Complete secondary education", duration: "2 years", type: "education" },
            { title: "ITI Course", description: "Technical trade course (Electrician, Fitter, etc.)", duration: "6 months-2 years", type: "education" },
            { title: "Apprenticeship", description: "On-job training with companies", duration: "1 year", type: "career" },
            { title: "Skill Certification", description: "Get certified by Skill Development Authority", duration: "1 month", type: "skill" },
            { title: "Employment", description: "Join manufacturing, construction, service sector", duration: "Career", type: "career" },
            { title: "Supervisor Role", description: "Advance to supervisory positions, 2-8 LPA", duration: "Career", type: "career" }
          ],
          "Supervisor": [
            { title: "Class 12", description: "Preferably with vocational/technical subjects", duration: "2 years", type: "education" },
            { title: "Diploma in Engineering", description: "Specialization in mechanical, electrical, civil, etc.", duration: "3 years", type: "education" },
            { title: "Leadership Skills", description: "Team management and communication training", duration: "6 months", type: "skill" },
            { title: "On-site Training", description: "Work in factories or projects to gain experience", duration: "1-2 years", type: "career" },
            { title: "Supervisor", description: "Oversee operations, ensure productivity, 3-10 LPA", duration: "Career", type: "career" }
          ],
          "Quality Inspector": [
            { title: "Class 12 Science/Technical", description: "Focus on Physics and Math", duration: "2 years", type: "education" },
            { title: "Diploma in Quality Management", description: "Specialized diploma in quality control", duration: "1-2 years", type: "education" },
            { title: "Quality Control Skills", description: "ISO standards, testing methods, safety rules", duration: "6 months", type: "skill" },
            { title: "Internship in QA/QC", description: "Hands-on training in factories or production units", duration: "6 months", type: "career" },
            { title: "Quality Inspector", description: "Monitor production quality, 3-12 LPA", duration: "Career", type: "career" }
          ],
          "Machine Operator": [
            { title: "Class 10/12", description: "Basic math and technical understanding", duration: "2 years", type: "education" },
            { title: "ITI Course or Certification", description: "Specialization in machine operations (CNC, lathe, etc.)", duration: "6 months-2 years", type: "education" },
            { title: "Hands-on Practice", description: "Practical training on machines", duration: "6 months", type: "skill" },
            { title: "Apprenticeship", description: "Work under experienced operators", duration: "1 year", type: "career" },
            { title: "Machine Operator", description: "Operate industrial machines, 2-8 LPA", duration: "Career", type: "career" }
          ],
          "Maintenance Engineer": [
            { title: "Class 12 PCM", description: "Physics, Chemistry, Math required", duration: "2 years", type: "education" },
            { title: "B.Tech/B.E Mechanical/Electrical", description: "Bachelor's in engineering field", duration: "4 years", type: "education" },
            { title: "Technical Skills", description: "Maintenance planning, troubleshooting, automation", duration: "1 year", type: "skill" },
            { title: "Industrial Internship", description: "Training with plants or factories", duration: "6 months", type: "career" },
            { title: "Junior Maintenance Engineer", description: "Entry-level role in manufacturing sector", duration: "1-2 years", type: "career" },
            { title: "Maintenance Engineer", description: "Manage maintenance teams and systems, 4-18 LPA", duration: "Career", type: "career" }
          ]
        }
      },
      {
        id: "web-development",
        title: "Web Development",
        description: "Professional course in frontend, backend, and full-stack web development technologies",
        careers: ["Web Developer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer"],
        entranceExams: ["No entrance exam", "Direct admission to courses"],
        colleges: ["NIIT", "Aptech", "Arena Animation", "Online Platforms", "Coding Bootcamps"],
        roadmaps: {
          "Web Developer": [
            { title: "Class 12", description: "Any stream with basic computer knowledge", duration: "2 years", type: "education" },
            { title: "Web Development Course", description: "HTML, CSS, JavaScript fundamentals", duration: "6 months", type: "skill" },
            { title: "Frontend Frameworks", description: "React, Angular, Vue.js", duration: "4 months", type: "skill" },
            { title: "Backend Technologies", description: "Node.js, Python, PHP, databases", duration: "4 months", type: "skill" },
            { title: "Portfolio Projects", description: "Build real-world web applications", duration: "3 months", type: "career" },
            { title: "Web Developer", description: "Full-time development role, 3-20 LPA", duration: "Career", type: "career" }
          ],
          "Frontend Developer": [
            { title: "Class 12", description: "Any stream with focus on computer basics", duration: "2 years", type: "education" },
            { title: "HTML, CSS, JavaScript", description: "Core web design skills", duration: "4 months", type: "skill" },
            { title: "Frontend Libraries & Frameworks", description: "React, Angular, or Vue.js mastery", duration: "4 months", type: "skill" },
            { title: "Version Control", description: "Git and GitHub for code collaboration", duration: "1 month", type: "skill" },
            { title: "UI/UX Basics", description: "Design principles for better user experience", duration: "2 months", type: "skill" },
            { title: "Portfolio Projects", description: "Create visually appealing websites and apps", duration: "3 months", type: "career" },
            { title: "Frontend Developer", description: "Specialize in UI-focused roles, 3-18 LPA", duration: "Career", type: "career" }
          ],
          "Backend Developer": [
            { title: "Class 12 PCM or Commerce", description: "Basic understanding of computers", duration: "2 years", type: "education" },
            { title: "Backend Fundamentals", description: "Data structures, algorithms, programming basics", duration: "4 months", type: "skill" },
            { title: "Server-Side Languages", description: "Node.js, Python, Java, or PHP", duration: "4 months", type: "skill" },
            { title: "Database Knowledge", description: "SQL and NoSQL (MySQL, MongoDB, PostgreSQL)", duration: "2 months", type: "skill" },
            { title: "API Development", description: "REST and GraphQL APIs", duration: "2 months", type: "skill" },
            { title: "Backend Projects", description: "Real-world apps like e-commerce or booking systems", duration: "3 months", type: "career" },
            { title: "Backend Developer", description: "Build scalable server-side systems, 4-22 LPA", duration: "Career", type: "career" }
          ],
          "Full Stack Developer": [
            { title: "Class 12", description: "Any stream with good problem-solving skills", duration: "2 years", type: "education" },
            { title: "Frontend Basics", description: "HTML, CSS, JavaScript", duration: "3 months", type: "skill" },
            { title: "Backend Basics", description: "Node.js, Python, PHP, or Java", duration: "3 months", type: "skill" },
            { title: "Databases & APIs", description: "SQL, NoSQL, and API development", duration: "2 months", type: "skill" },
            { title: "Frontend Frameworks", description: "React, Angular, or Vue.js", duration: "2 months", type: "skill" },
            { title: "End-to-End Projects", description: "Create fully functional web applications", duration: "3 months", type: "career" },
            { title: "Full Stack Developer", description: "Handle both frontend and backend systems, 5-25 LPA", duration: "Career", type: "career" }
          ],
          "UI/UX Designer": [
            { title: "Class 12", description: "Any stream with a creative mindset", duration: "2 years", type: "education" },
            { title: "Design Fundamentals", description: "Typography, color theory, design thinking", duration: "3 months", type: "skill" },
            { title: "UI Design Tools", description: "Master Figma, Adobe XD, Sketch", duration: "3 months", type: "skill" },
            { title: "UX Research & Wireframing", description: "User research, journey mapping, wireframes", duration: "2 months", type: "skill" },
            { title: "Portfolio Creation", description: "Build and showcase strong design projects", duration: "2 months", type: "career" },
            { title: "Internship", description: "Work with product companies or agencies", duration: "3-6 months", type: "career" },
            { title: "UI/UX Designer", description: "Design user-friendly interfaces, 3-18 LPA", duration: "Career", type: "career" }
          ]
        }
      }
    ]
  }
];

function StreamsCoursesPage() {
  const [openRoadmap, setOpenRoadmap] = useState<string | null>(null);

  const toggleRoadmap = (roadmapId: string): void => {
    setOpenRoadmap(openRoadmap === roadmapId ? null : roadmapId);
  };

  return (
  <div className="min-h-screen bg-background pt-24 relative">
    {/* 3D Background */}
    <div className="absolute inset-0 opacity-30 -z-10">
      <CourseCard3D />
    </div>

    

  
      <div className="relative z-10 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
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
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Streams & Courses
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore a wide range of career options after 10th and 12th grade.
Find the path that matches your interests, skills, and future goals.
            </motion.p>
          </motion.div>

          {/* Course Categories */}
          {courseCategories.map((category, categoryIndex) => (
            <motion.section
              key={categoryIndex}
              className="mb-20"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <motion.div
                  className={`inline-block p-1 rounded-2xl bg-gradient-to-r ${category.gradient} mb-4`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-background rounded-xl px-6 py-2">
                    <h2 className={`text-3xl md:text-4xl font-display font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                      {category.title}
                    </h2>
                  </div>
                </motion.div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {category.courses.map((course, courseIndex) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: courseIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="bg-gradient-glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}></div>
                          <span className="text-sm text-muted-foreground">{category.title}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                      </div>

                      {/* Entrance Exams */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Entrance Exams:</h4>
                        <div className="flex flex-wrap gap-1">
                          {course.entranceExams.map((exam, index) => (
                            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Top Colleges */}
                      {course.colleges && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2">Top Colleges:</h4>
                          <div className="text-xs text-muted-foreground">
                            {course.colleges.slice(0, 3).join(", ")}
                            {course.colleges.length > 3 && "..."}
                          </div>
                        </div>
                      )}

                      {/* Career Opportunities */}
<div className="mb-4">
  <h4 className="text-sm font-semibold text-foreground mb-2">
    Career Opportunities:
  </h4>
  <div className="flex flex-wrap gap-2">
    {course.careers.map((career, index) => (
      <button
        key={index}
        onClick={() => toggleRoadmap(`${course.id}-${career}`)}
        className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
          openRoadmap === `${course.id}-${career}`
            ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md'
            : 'bg-purple-900/30 text-purple-400 hover:bg-purple-800/40'
        }`}
      >
        {career}
      </button>
    ))}
  </div>
</div>


                      {/* View Details Link */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="pt-2 border-t border-white/10"
                      >
                        <span className="text-sm text-primary cursor-pointer hover:text-primary/80 transition-colors">
                          Click careers above to see roadmaps →
                        </span>
                      </motion.div>
                    </div>

                    {/* Career Roadmaps */}
                    {course.careers.map((career) => (
                      course.roadmaps && course.roadmaps[career] && (
                        <CareerRoadmap
                          key={`${course.id}-${career}`}
                          career={career}
                          roadmap={course.roadmaps[career]}
                          isOpen={openRoadmap === `${course.id}-${career}`}
                          onClose={() => setOpenRoadmap(null)}
                        />
                      )
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}

          {/* EduWise Banner */}
          <motion.div
            className="text-center mt-20 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="bg-gradient-primary p-3 rounded-xl">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-display font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    Need Personalized Career Guidance?
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    Chat with our smart AI Mentor to instantly discover the best courses, careers, and personalized roadmaps — get answers to all your doubts in one conversation!
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-glass backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <h3 className="text-3xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our smart system helps you choose the right path based on your interests and goals.
              </p>
              
              <motion.button
             
                className="px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-glow-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/choose'}
              >
                 
                Get Personalized Recommendations
                
              </motion.button>
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default StreamsCoursesPage;