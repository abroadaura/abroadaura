// EligibilityChecker.jsx
import React, { useState, useEffect } from "react";
import { 
  CheckCircle, XCircle, TrendingUp, Target, Award, Zap, 
  GraduationCap, BookOpen, Globe, Briefcase, FileText,
  ChevronRight, Info, Star, Clock, Users, MapPin
} from "lucide-react";

const EligibilityChecker = () => {
  const [data, setData] = useState({
    gpa: "",
    ielts: "",
    gre: "",
    workExp: "",
    research: "no",
    targetCountry: "",
    fieldOfStudy: "",
    undergradUniversity: ""
  });

  const [activeTab, setActiveTab] = useState("checker");
  const [universityMatches, setUniversityMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample university data
  const universities = [
    { name: "University of Toronto", country: "Canada", rank: 21, minGPA: 3.3, minIELTS: 6.5, category: "top50" },
    { name: "University of British Columbia", country: "Canada", rank: 34, minGPA: 3.2, minIELTS: 6.5, category: "top50" },
    { name: "University of Melbourne", country: "Australia", rank: 33, minGPA: 3.0, minIELTS: 6.5, category: "top50" },
    { name: "University of Sydney", country: "Australia", rank: 41, minGPA: 3.0, minIELTS: 6.5, category: "top100" },
    { name: "University of Manchester", country: "UK", rank: 51, minGPA: 3.0, minIELTS: 6.5, category: "top100" },
    { name: "University of Amsterdam", country: "Netherlands", rank: 55, minGPA: 2.8, minIELTS: 6.5, category: "top100" },
    { name: "University of Auckland", country: "New Zealand", rank: 68, minGPA: 2.8, minIELTS: 6.0, category: "midTier" },
    { name: "University of Ottawa", country: "Canada", rank: 237, minGPA: 2.5, minIELTS: 6.0, category: "midTier" },
  ];

  const targetCountries = [
    "USA", "Canada", "UK", "Australia", "Germany", 
    "Netherlands", "New Zealand", "Sweden", "Singapore"
  ];

  const fieldsOfStudy = [
    "Computer Science", "Business Administration", "Engineering",
    "Data Science", "Public Health", "Finance", "Artificial Intelligence"
  ];

  const calculateScore = () => {
    let score = 0;
    const gpa = parseFloat(data.gpa) || 0;
    const ielts = parseFloat(data.ielts) || 0;
    const gre = parseInt(data.gre) || 0;
    const workExp = parseInt(data.workExp) || 0;

    // GPA Scoring (max 40)
    if (gpa >= 3.7) score += 40;
    else if (gpa >= 3.5) score += 35;
    else if (gpa >= 3.3) score += 30;
    else if (gpa >= 3.0) score += 25;
    else if (gpa >= 2.7) score += 15;
    else if (gpa >= 2.3) score += 5;
    
    // IELTS Scoring (max 25)
    if (ielts >= 8.0) score += 25;
    else if (ielts >= 7.5) score += 22;
    else if (ielts >= 7.0) score += 18;
    else if (ielts >= 6.5) score += 15;
    else if (ielts >= 6.0) score += 10;
    
    // GRE Scoring (max 20, optional)
    if (gre > 0) {
      if (gre >= 325) score += 20;
      else if (gre >= 320) score += 17;
      else if (gre >= 315) score += 14;
      else if (gre >= 310) score += 10;
      else if (gre >= 300) score += 5;
    }
    
    // Work Experience (max 10)
    if (workExp >= 5) score += 10;
    else if (workExp >= 3) score += 8;
    else if (workExp >= 2) score += 6;
    else if (workExp >= 1) score += 3;
    
    // Research Experience (max 5)
    if (data.research === "yes") score += 5;
    
    return Math.min(100, score);
  };

  const calculateUniversityMatches = () => {
    const score = calculateScore();
    const gpa = parseFloat(data.gpa) || 0;
    const ielts = parseFloat(data.ielts) || 0;
    
    return universities.filter(uni => {
      if (gpa < uni.minGPA) return false;
      if (ielts < uni.minIELTS) return false;
      
      if (score >= 75 && uni.category === "top50") return true;
      if (score >= 60 && uni.category === "top100") return true;
      if (score >= 40 && uni.category === "midTier") return true;
      
      return false;
    }).slice(0, 5);
  };

  useEffect(() => {
    setUniversityMatches(calculateUniversityMatches());
  }, [data]);

  const score = calculateScore();
  const percentage = Math.min(100, score);
  
  const getEligibilityLevel = () => {
    if (percentage >= 80) return { 
      level: "Excellent Match", 
      color: "text-green-600", 
      bgColor: "bg-green-50", 
      borderColor: "border-green-200",
      icon: <Award className="text-green-600" size={24} />,
      description: "Strong candidate for top universities"
    };
    if (percentage >= 65) return { 
      level: "Good Match", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200",
      icon: <Target className="text-blue-600" size={24} />,
      description: "Competitive for good universities"
    };
    if (percentage >= 50) return { 
      level: "Moderate Match", 
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50", 
      borderColor: "border-yellow-200",
      icon: <TrendingUp className="text-yellow-600" size={24} />,
      description: "Consider mid-tier universities"
    };
    if (percentage >= 35) return { 
      level: "Fair Match", 
      color: "text-orange-600", 
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200",
      icon: <BookOpen className="text-orange-600" size={24} />,
      description: "May need foundation programs"
    };
    return { 
      level: "Needs Improvement", 
      color: "text-red-600", 
      bgColor: "bg-red-50", 
      borderColor: "border-red-200",
      icon: <Zap className="text-red-600" size={24} />,
      description: "Focus on improving key areas"
    };
  };

  const eligibility = getEligibilityLevel();

  const suggestions = [
    { 
      condition: data.gpa < 3.0 && data.gpa !== "", 
      text: "Consider retaking key courses or pursuing post-bacc programs", 
      priority: "high" 
    },
    { 
      condition: data.ielts < 6.5 && data.ielts !== "", 
      text: "IELTS preparation courses recommended", 
      priority: data.ielts < 6.0 ? "high" : "medium" 
    },
    { 
      condition: data.gre < 310 && data.gre > 0, 
      text: "GRE score improvement needed for competitive programs", 
      priority: "medium" 
    },
    { 
      condition: data.workExp < 2 && data.workExp !== "", 
      text: "Internships or relevant work experience would strengthen application", 
      priority: "low" 
    },
    { 
      condition: data.research === "no", 
      text: "Research experience can significantly boost applications", 
      priority: "medium" 
    },
  ].filter(s => s.condition).sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getScoreBreakdown = () => {
    const gpa = parseFloat(data.gpa) || 0;
    const ielts = parseFloat(data.ielts) || 0;
    const gre = parseInt(data.gre) || 0;
    const workExp = parseInt(data.workExp) || 0;
    
    let breakdown = [
      { label: "GPA Score", value: 0, max: 40, color: "bg-blue-400" },
      { label: "IELTS Score", value: 0, max: 25, color: "bg-blue-400" },
      { label: "GRE Score", value: 0, max: 20, color: "bg-blue-400" },
      { label: "Work Experience", value: 0, max: 10, color: "bg-blue-400" },
      { label: "Research", value: 0, max: 5, color: "bg-blue-400" },
    ];

    // Calculate actual values
    if (gpa >= 3.7) breakdown[0].value = 40;
    else if (gpa >= 3.5) breakdown[0].value = 35;
    else if (gpa >= 3.3) breakdown[0].value = 30;
    else if (gpa >= 3.0) breakdown[0].value = 25;
    else if (gpa >= 2.7) breakdown[0].value = 15;
    else if (gpa >= 2.3) breakdown[0].value = 5;

    if (ielts >= 8.0) breakdown[1].value = 25;
    else if (ielts >= 7.5) breakdown[1].value = 22;
    else if (ielts >= 7.0) breakdown[1].value = 18;
    else if (ielts >= 6.5) breakdown[1].value = 15;
    else if (ielts >= 6.0) breakdown[1].value = 10;

    if (gre >= 325) breakdown[2].value = 20;
    else if (gre >= 320) breakdown[2].value = 17;
    else if (gre >= 315) breakdown[2].value = 14;
    else if (gre >= 310) breakdown[2].value = 10;
    else if (gre >= 300) breakdown[2].value = 5;

    if (workExp >= 5) breakdown[3].value = 10;
    else if (workExp >= 3) breakdown[3].value = 8;
    else if (workExp >= 2) breakdown[3].value = 6;
    else if (workExp >= 1) breakdown[3].value = 3;

    if (data.research === "yes") breakdown[4].value = 5;

    return breakdown;
  };

  const scoreBreakdown = getScoreBreakdown();

  return (
    <div className="min-h-screen md:bg-blue-50 rounded-2xl  md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-blue-600" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
               Eligibility Checker
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl hidden md:block">
            Assess your eligibility for graduate programs worldwide. Get personalized 
            suggestions and university matches based on your profile.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("checker")}
            className={`px-4 py-3 font-medium transition-all ${
              activeTab === "checker"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Eligibility Checker
          </button>
          <button
            onClick={() => setActiveTab("universities")}
            className={`px-4 py-3 font-medium transition-all ${
              activeTab === "universities"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            University Matches ({universityMatches.length})
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`px-4 py-3 font-medium transition-all ${
              activeTab === "insights"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Insights & Tips
          </button>
        </div>

        {/* Main Content */}
        {activeTab === "checker" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className=" rounded-2xl py-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-blue-600" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* GPA */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <BookOpen size={16} />
                      GPA (out of 4.0)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="4.0"
                      placeholder="e.g., 3.5"
                      className="w-full p-4 bg-gray-50 placeholder-gray-300 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={data.gpa}
                      onChange={(e) => setData({ ...data, gpa: e.target.value })}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Info size={14} />
                        Minimum: 2.0
                      </span>
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <Target size={14} />
                        Target: 3.0+
                      </span>
                    </div>
                  </div>

                  {/* IELTS */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Globe size={16} />
                      IELTS Score
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="9"
                      placeholder="e.g., 7.0"
                      className="w-full p-4 bg-gray-50 border placeholder-gray-300 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={data.ielts}
                      onChange={(e) => setData({ ...data, ielts: e.target.value })}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Minimum: 6.0</span>
                      <span className="text-green-600 font-medium">Target: 6.5+</span>
                    </div>
                  </div>

                  {/* GRE */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <TrendingUp size={16} />
                      GRE Score (optional)
                    </label>
                    <input
                      type="number"
                      min="260"
                      max="340"
                      placeholder="e.g., 320"
                      className="w-full p-4 bg-gray-50 border placeholder-gray-300 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={data.gre}
                      onChange={(e) => setData({ ...data, gre: e.target.value })}
                    />
                    <div className="text-sm text-gray-500">
                      Competitive: 315+
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Briefcase size={16} />
                      Work Experience (years)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      placeholder="e.g., 2"
                      className="w-full p-4 bg-gray-50 border placeholder-gray-300 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={data.workExp}
                      onChange={(e) => setData({ ...data, workExp: e.target.value })}
                    />
                  </div>

                  
                  {/* Research Experience */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <BookOpen size={16} />
                      Research Experience
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setData({ ...data, research: "yes" })}
                        className={`flex-1 p-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          data.research === "yes"
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <CheckCircle size={20} />
                        Yes, I have research experience
                      </button>
                      <button
                        onClick={() => setData({ ...data, research: "no" })}
                        className={`flex-1 p-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                          data.research === "no"
                            ? "bg-gray-100 border-gray-400 text-gray-800"
                            : "bg-gray-50 border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <XCircle size={20} />
                        No research experience
                      </button>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
                  <div className="space-y-4">
                    {scoreBreakdown.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="font-medium">{item.value}/{item.max}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${(item.value / item.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              <div className={`${eligibility.bgColor} ${eligibility.borderColor} border-2 rounded-2xl p-6 sticky top-8`}>
                <div className="text-center mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-white mb-4 shadow-sm">
                    {eligibility.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${eligibility.color} mb-2`}>
                    {eligibility.level}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{eligibility.description}</p>
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {percentage}%
                  </div>
                  <p className="text-gray-600">Eligibility Score</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full rounded-full ${
                        percentage >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                        percentage >= 65 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                        percentage >= 50 ? "bg-gradient-to-r from-yellow-500 to-amber-500" :
                        percentage >= 35 ? "bg-gradient-to-r from-orange-500 to-amber-500" : 
                        "bg-gradient-to-r from-red-500 to-pink-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0%</span>
                    <span className="font-medium">Score</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="text-yellow-600" size={20} />
                      <h4 className="font-semibold text-gray-900">Improvement Areas</h4>
                    </div>
                    <ul className="space-y-3">
                      {suggestions.slice(0, 3).map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`p-1 rounded ${
                            suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                            suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {suggestion.priority === 'high' ? '🔴' : 
                             suggestion.priority === 'medium' ? '🟡' : '🔵'}
                          </div>
                          <span className="text-sm text-gray-700 flex-1">{suggestion.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Top Matches Preview */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Top Matches</h4>
                    <button 
                      onClick={() => setActiveTab("universities")}
                      className="text-blue-600 text-sm font-medium flex items-center gap-1"
                    >
                      View all <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {universityMatches.slice(0, 2).map((uni, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{uni.name}</h5>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Star size={14} className="text-yellow-500 fill-current" />
                            #{uni.rank}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          {uni.country}
                        </div>
                      </div>
                    ))}
                    {universityMatches.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        Enter your scores to see university matches
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Universities Tab */}
        {activeTab === "universities" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">University Matches</h2>
                <p className="text-gray-600 mt-2">
                  {universityMatches.length} universities match your profile
                </p>
              </div>
              <button
                onClick={() => setActiveTab("checker")}
                className="px-6 py-3 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universityMatches.map((uni, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{uni.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-gray-600 text-sm">{uni.country}</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      Rank #{uni.rank}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Minimum GPA</span>
                      <span className="font-medium">{uni.minGPA}/4.0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">IELTS Required</span>
                      <span className="font-medium">{uni.minIELTS}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {universityMatches.length === 0 && (
              <div className="text-center py-16">
                <GraduationCap className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Enter your academic scores in the Eligibility Checker to see matching universities.
                </p>
                <button
                  onClick={() => setActiveTab("checker")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-all"
                >
                  Go to Checker
                </button>
              </div>
            )}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === "insights" && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tips Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-yellow-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Improvement Tips</h2>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">📈 Improve Your GPA</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Retake key prerequisite courses</li>
                    <li>• Consider post-baccalaureate programs</li>
                    <li>• Highlight upward GPA trend in applications</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">🌍 Language Test Tips</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Take official preparation courses</li>
                    <li>• Consider PTE or TOEFL as alternatives</li>
                    <li>• Practice with mock tests regularly</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Strengthen Profile</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Gain relevant work experience</li>
                    <li>• Publish research papers or projects</li>
                    <li>• Secure strong recommendation letters</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Application Timeline</h2>
              </div>

              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">12+ Months Before</h4>
                  <p className="text-gray-600 text-sm mt-1">Research programs, prepare for tests</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">6-12 Months Before</h4>
                  <p className="text-gray-600 text-sm mt-1">Take tests, request recommendations</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">3-6 Months Before</h4>
                  <p className="text-gray-600 text-sm mt-1">Write SOP, prepare application materials</p>
                </div>

                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-red-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-900">Deadlines</h4>
                  <p className="text-gray-600 text-sm mt-1">Submit applications (Dec-Feb)</p>
                </div>
              </div>

              {/* Resources */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Useful Resources</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">Free SOP Writing Guide</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">University Ranking Comparison</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-gray-700">Scholarship Finder Tool</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityChecker;