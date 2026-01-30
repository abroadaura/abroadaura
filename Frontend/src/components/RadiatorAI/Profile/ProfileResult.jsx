import CountryChance from "./CountryChance";
import ScoreCard from "./ScoreCard";
import "react-circular-progressbar/dist/styles.css";

import { 
  Target, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  BarChart3,
  Building
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileResult = ({ analysis, onReset }) => {
  if (!analysis) return null;
  const navigate = useNavigate();

const scoreCards = [
  {
    label: "Academics",
    score: analysis?.academicsScore,
    tagline: "Strength of your academic foundation"
  },
  {
    label: "Test Scores",
    score: analysis?.testScoresScore,
    tagline: "Performance in standardized evaluations"
  },
  {
    label: "Profile Strength",
    score: analysis?.profileStrengthScore,
    tagline: "Overall impact of your student profile"
  },
  {
    label: "Readiness",
    score: analysis?.admissionReadinessScore,
    tagline: "How prepared you are for university life"
  },
  {
    label: "Extracurricular",
    score: analysis?.extracurricularScore,
    tagline: "Depth of involvement beyond academics"
  }
];


  return (
    <div className="mt-5 md:mt-12 space-y-8 animate-fadeIn">
      {/* Overall Score Banner */}
      <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 ">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-md md:text-2xl font-bold text-gray-700">Profile Analysis Completed</h2>
            <p className="text-gray-500 mt-1 hidden md:block">AI-powered evaluation of your academic profile</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-center">
              <div className="text-5xl font-bold bg-blue-700 bg-clip-text text-transparent">
                {(analysis?.admissionReadinessScore).toFixed(1)}
              </div>
              <div className="text-gray-600 font-medium">Overall Score /10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scores Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="mr-2" size={22} />
          Detailed Score Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {scoreCards.map((card, index) => (
            <ScoreCard key={index} {...card} />
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
          <div className={`text-xl md:text-3xl font-bold ${analysis?.profileLevel=== "Weak" ? "text-red-600" : analysis?.profileLevel==="Average" ? "text-yellow-500" : "text-green-600"} `}>{analysis?.profileLevel}</div>
          <p className="text-gray-600 mt-3">
            Your profile is currently at {analysis?.profileLevel.toLowerCase()} level compared to other applicants
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
            <div className="text-xl md:text-3xl font-bold text-green-600">{analysis?.recommendedUniversityTier}</div>
            <div className={`text-sm px-3 py-1 rounded-full font-medium ${
              analysis?.recommendedUniversityTier.includes("Top-tier") ? "bg-green-100 text-green-700" :
              analysis?.recommendedUniversityTier.includes("Mid-tier") ? "bg-yellow-100 text-yellow-700" :
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

      {/* Country Chances */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Globe className="mr-2" size={22} />
          Admission Chances by Country
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(analysis?.chancesByCountry).sort().map(([country, percentage]) => (
            <CountryChance key={country} country={country} percentage={percentage} />
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-2xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <CheckCircle className="text-green-600" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Profile Strengths</h3>
          </div>
          <ul className="space-y-3">
            {analysis?.strengths.map((strength, i) => (
              <li key={i} className="flex items-start p-2 rounded-lg">
                <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-2xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-100 rounded-lg mr-3">
              <AlertCircle className="text-amber-600" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Areas for Improvement</h3>
          </div>
          <ul className="space-y-3">
            {analysis?.weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start p-2 rounded-lg">
                <AlertCircle className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-700">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 p-6 rounded-2xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Lightbulb className="text-blue-600" size={22} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Recommendations</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {analysis?.improvementSuggestions.map((suggestion, i) => (
            <div key={i} className=" p-2 rounded-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-gray-700">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Overall Assessment</h3>
        <p className="text-gray-700 leading-relaxed">{analysis?.summary}</p>
        
        <div className="mt-6  bg-gray-50 rounded-xl">
          <h4 className="font-medium text-gray-800 mb-2">Steps to Improve Profile:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Improve Test Scores</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Gain Experience</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Enhance SOP</span>
            <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">Build Extracurriculars</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 border-t border-gray-200">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-700 cursor-pointer text-white rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          Analyze New Profile
        </button>
        <button onClick={()=>navigate('/')} className="px-6 py-3 cursor-pointer bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-all">
          Book Consultation
        </button>
      </div>
    </div>
  );
};

export default ProfileResult
