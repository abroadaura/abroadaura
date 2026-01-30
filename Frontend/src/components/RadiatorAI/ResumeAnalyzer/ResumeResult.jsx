import React, { useState } from "react";
import { 
  Target, 
  BookOpen, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  GraduationCap,
  Building,
  Globe,
  RefreshCw,
  BarChart3,
  Loader2
} from "lucide-react";

const ResumeResult = ({ analysis, onRevise, formData }) => {
  // Use provided analysis data or fallback to sample data
  // const analysisData = analysis || {
  //   error: "profile are wrong",
  //   error: 0,
  //   academicStrengthScore: 7.5,
  //   courseRelevanceScore: 8.5,
  //   extracurricularScore: 8.0,
  //   formattingAndClarityScore: 7.0,
  //   admissionChances: 7.5,
  //   profileLevel: "Average",
  //   strengths: [
  //     "Robust project portfolio showcasing full‑stack development and AI integration",
  //     "Strong problem‑solving demonstrated by 650+ DSA problems solved",
  //     "Consistent academic performance with a CGPA of 8.8 and A+ intermediate grades"
  //   ],
  //   weaknesses: [
  //     "Limited research experience and absence of university‑level coursework beyond fundamentals",
  //     "SOP lacks specificity and depth regarding future research interests",
  //     "No evidence of leadership or significant extracurricular impact beyond competitions"
  //   ],
  //   improvementSuggestions: [
  //     "Enhance the SOP with concrete research goals and how U of T's faculty align with them",
  //     "Seek opportunities for research projects or internships to demonstrate academic depth",
  //     "Highlight any leadership roles or community impact to strengthen extracurricular profile"
  //   ],
  //   recommendedUniversityTier: "Safe",
  //   summary: "Ashutosh presents a solid technical foundation and a commendable project record, yet the application would benefit from deeper research exposure and a more focused statement of purpose. While his academic credentials are respectable, the lack of university‑level coursework and leadership experience may limit competitiveness for a top‑tier program. With targeted improvements, he could strengthen his candidacy for admission to the University of Toronto's BSc Computer Science program."
  // };
  const analysisData = analysis;

  const [isRevising, setIsRevising] = useState(false);

  // Function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 8) return "from-green-500 to-emerald-600";
    if (score >= 7) return "from-yellow-500 to-amber-600";
    if (score >= 6) return "from-orange-500 to-red-600";
    return "from-red-500 to-pink-600";
  };


  // Score cards data
  const scoreCards = [
    {
      label: "Academic Strength",
      score: analysisData.academicStrengthScore,
      icon: <BookOpen size={20} />,
      description: "Evaluates grades, coursework, and academic achievements"
    },
    {
      label: "Course Relevance",
      score: analysisData.courseRelevanceScore,
      icon: <Target size={20} />,
      description: "Alignment with target program requirements"
    },
    {
      label: "Extracurricular",
      score: analysisData.extracurricularScore,
      icon: <Users size={20} />,
      description: "Activities, projects, and leadership experience"
    },
    {
      label: "Format & Clarity",
      score: analysisData.formattingAndClarityScore,
      icon: <FileText size={20} />,
      description: "Resume structure, readability, and presentation"
    },
  ];

  // Function to handle revise button click
  const handleRevise = () => {
    setIsRevising(true);
    
    // Show confirmation or trigger parent component action
    if (window.confirm("Are you sure you want to revise your resume? This will take you back to the upload section.")) {
      if (onRevise) {
        onRevise();
      } else {
        // Fallback action if no parent handler provided
        window.location.href = '/resume-upload';
      }
    }
    
    setIsRevising(false);
  };

  return (
    <div className="min-h-screen bg-white ">
      {analysisData.error === 0 && (<div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-3">
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-1 gap-6">
          {/* Left Column - Scores */}
          <div className="lg:col-span-3 space-y-6">

            <div className="md:flex md:items-center md:justify-center md:gap-5">
            {/* Overall Score Banner */}
            <div className="bg-gray-400 md:w-2/3 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-bold mb-2">Analysis Score</h2>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold">{(analysisData.admissionChances).toFixed(1)*10}%</div>
                </div>
              </div>
              
              {/* Score Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Admission Potential</span>
                  <span>{analysisData.admissionChances}/10</span>
                </div>
                <div className="w-full bg-white/30 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(analysisData.admissionChances)}`}
                    style={{ width: `${analysisData.admissionChances * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* University Info */}
            <div className="md:w-1/3 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm md:mt-0 mt-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg mr-3">
                  <Building className="text-red-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Target University</h3>
                  <p className="text-sm text-gray-600"> {formData.university}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <GraduationCap size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-700"> {formData.course}</span>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-700">{formData.country}</span>
                </div>
              </div>
            </div>

            </div>

            {/* Score Cards Grid */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="mr-2" size={20} />
                Detailed Score Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scoreCards.map((card, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {card.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{card.label}</h4>
                          <p className="text-xs text-gray-500">{card.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between px-4">
                      <div>
                        <div className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor(card.score)} bg-clip-text text-transparent`}>
                          {card.score.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500"></div>
                      </div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(card.score)}`}
                          style={{ width: `${card.score * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                  {/* Profile Level & University Tier */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center mb-4 border-b pb-2 border-gray-200">
            <div className="p-2 bg-blue-50 rounded-lg mr-3 ">
              <Target className="text-blue-600" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Profile Level</h3>
          </div>
          <div className={`text-xl md:text-3xl font-bold ${analysisData.profileLevel=== "Weak" ? "text-red-600" : analysisData.profileLevel==="Average" ? "text-yellow-500" : "text-green-600"} `}>{analysisData.profileLevel}</div>
          <p className="text-gray-600 mt-3">
            Your profile is currently at {analysisData.profileLevel.toLowerCase()} level compared to other applicants
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center mb-4 border-b pb-2 border-gray-200">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <Building className="text-blue-600" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Recommended University <span className="hidden md:block">Tier</span></h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xl md:text-3xl font-bold text-green-600">{analysisData.recommendedUniversityTier}</div>
            <div className={`text-sm px-3 py-1 rounded-full font-medium ${
              analysisData.recommendedUniversityTier.includes("Top-tier") ? "bg-green-100 text-green-700" :
              analysisData.recommendedUniversityTier.includes("Mid-tier") ? "bg-yellow-100 text-yellow-700" :
              "bg-blue-100 text-blue-700"
            }`}>
              Best Fit
            </div>
          </div>
          <p className="text-gray-600 mt-3">
            Universities matching your current profile strength and credentials
          </p>
        </div>
      </div>
          </div>
          </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 py-6">
              {/* Strengths */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <CheckCircle className="text-green-600" size={22} />
                  </div>
                  <h3 className="font-bold text-gray-800">Key Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {analysisData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <CheckCircle className="text-white" size={14} />
                      </div>
                      <span className="text-gray-700 text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3">
                    <AlertCircle className="text-amber-600" size={22} />
                  </div>
                  <h3 className="font-bold text-gray-800">Areas for Improvement</h3>
                </div>
                <ul className="space-y-3">
                  {analysisData.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <AlertCircle className="text-white" size={14} />
                      </div>
                      <span className="text-gray-700 text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 ">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Lightbulb className="text-blue-600" size={22} />
                </div>
                <h3 className="font-bold text-gray-800">Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisData.improvementSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm my-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-100 rounded-lg mr-3">
                  <FileText className="text-gray-600" size={22} />
                </div>
                <h3 className="font-bold text-gray-800">Profile Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{analysisData.summary}</p>
            </div>

            {/* Action Buttons */}
          <div className="flex flex-col justify-center items-center gap-4">
                
                <button
                  onClick={handleRevise}
                  disabled={isRevising}
                  className=" bg-white border-2 border-blue-600 text-blue-600 p-4 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                >
                  {isRevising ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={20} />
                      Revise & Re-analyze
                    </>
                  )}
                </button>
              </div>
          </div>)}

{analysisData.error !== 0 && (
  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
        ⚠️
      </div>

      <div>
        <h2 className="font-semibold text-sm">
          Please fix the highlighted issues and retry to get result
        </h2>
        <p className="mt-1 text-sm text-red-700 leading-relaxed">
          {analysisData.error}
        </p>
      </div>
    </div>
  </div>
)}

        </div>
  );
};

export default ResumeResult;