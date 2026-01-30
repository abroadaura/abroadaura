

import React, { useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../../context/AuthContext";

const SOPAnalyzer = ({ setShowMenu, fetchCredits, credits}) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTextBox, setShowTextBox] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const {user} = useAuth();

  const analyzeSOP = async (retry=0) => {
    
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 200) {
      alert("SOP too short. Minimum 200 words recommended.");
      return;
    }
const baseUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
      setLoading(true);
      setShowMenu(false)
      const res = await axios.post(
        `${baseUrl}/api/sop/analyze`,
        { text, userId: user?.uid, },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchCredits();
      
      setResult({
        clarity: res?.data?.clarityScore,
        grammar: res?.data?.grammarScore,
        structure: res?.data?.structureScore,
        originality: res?.data?.originalityScore,
        plagiarismRisk: res?.data?.plagiarismRisk,
        strengths: res?.data?.strengths,
        weaknesses: res?.data?.weaknesses,
        suggestions: res?.data?.improvementSuggestions,
      });

      setShowTextBox(false);
      setShowMore(false); // Reset showMore when analyzing new SOP
      setLoading(false);
    } catch (error) {
        if (retry < 1) {
      await new Promise((r) => setTimeout(r, 800));
      return analyzeProfile(profileData, retry + 1);
    }
      console.error(
        error.response?.data?.message || "SOP analysis failed"
      );
      alert(error.response?.data?.message || "Analysis failed. Please try again.");
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setShowTextBox(true);
    setShowMore(false);
  };

  const editSOP = () => {
    setShowTextBox(true);
    setShowMore(false);
  };

  // Function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 8) return "#10B981"; // Green
    if (score >= 6) return "#F59E0B"; // Yellow
    return "#EF4444"; // Red
  };

  // Function to get color for plagiarism risk
  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low": return "#10B981";
      case "medium": return "#F59E0B";
      case "high": return "#EF4444";
      default: return "#6B7280";
    }
  };

  return (
    <section className="max-w-6xl mx-auto bg-white pt-6 md:p-6 rounded-xl ">

      {showTextBox && (
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Paste your Statement of Purpose here (Minimum 200 words)
          </label>
          <textarea
            rows="10"
            placeholder="Enter your Statement of Purpose here..."
            className="w-full border-2 placeholder-gray-300 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end mt-1 text-sm text-gray-500">
            <div>
              {text.length} characters
            </div>
          </div>
        </div>
      )}

      {!showTextBox && result && (
        <div className="bg-gray-50 p-5 rounded-xl mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Your SOP</h3>
            <button
              onClick={editSOP}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit SOP
            </button>
          </div>
          <div className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>
            <p>
              {showMore ? text : `${text.slice(0, 1000)}...`}
            </p>
            <button 
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 hover:text-blue-800 font-medium mt-2"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      )}

      {/* Show Analyze button when we have text but no result OR when showTextBox is true */}
      {(showTextBox || (!result && text.length > 0)) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={analyzeSOP}
            disabled={loading || text.trim().length === 0 || !credits}
            className="w-full sm:w-auto bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all font-semibold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <p>{credits ? "Analyze SOP" : "No credits"}</p>
            )}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 p-5">Analysis Summary</h3>
          
          {/* Scores Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Clarity Score */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl shadow-sm">
              <div className="w-32 h-32 mb-4">
                <CircularProgressbar
                  value={result.clarity}
                  maxValue={10}
                  text={`${result.clarity}/10`}
                  styles={buildStyles({
                    textSize: "22px",
                    pathColor: getScoreColor(result.clarity),
                    textColor: "#1F2937",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Clarity</h3>
              <p className="text-sm text-gray-600 text-center">
                How clear and understandable
              </p>
            </div>

            {/* Grammar Score */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl shadow-sm">
              <div className="w-32 h-32 mb-4">
                <CircularProgressbar
                  value={result.grammar}
                  maxValue={10}
                  text={`${result.grammar}/10`}
                  styles={buildStyles({
                    textSize: "22px",
                    pathColor: getScoreColor(result.grammar),
                    textColor: "#1F2937",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Grammar</h3>
              <p className="text-sm text-gray-600 text-center">
                Grammatical accuracy
              </p>
            </div>

            {/* Structure Score */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl shadow-sm">
              <div className="w-32 h-32 mb-4">
                <CircularProgressbar
                  value={result.structure}
                  maxValue={10}
                  text={`${result.structure}/10`}
                  styles={buildStyles({
                    textSize: "22px",
                    pathColor: getScoreColor(result.structure),
                    textColor: "#1F2937",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Structure</h3>
              <p className="text-sm text-gray-600 text-center">
                Organization and flow
              </p>
            </div>

            {/* Originality Score */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl shadow-sm">
              <div className="w-32 h-32 mb-4">
                <CircularProgressbar
                  value={result.originality}
                  maxValue={10}
                  text={`${result.originality}/10`}
                  styles={buildStyles({
                    textSize: "22px",
                    pathColor: getScoreColor(result.originality),
                    textColor: "#1F2937",
                    trailColor: "#E5E7EB",
                  })}
                />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Originality</h3>
              <p className="text-sm text-gray-600 text-center">
                Uniqueness and personal voice
              </p>
            </div>

            {/* Plagiarism Risk */}
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl shadow-sm">
              <div className="w-32 h-32 mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: getRiskColor(result.plagiarismRisk) }}
                  >
                    {result.plagiarismRisk}
                  </div>
                  <div className="text-sm text-gray-600">Plagiarism Risk</div>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Plagiarism</h3>
              <p className="text-sm text-gray-600 text-center">
                Similarity to other texts
              </p>
            </div>
          </div>

          {/* Analysis Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Strengths */}
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h3 className="text-xl font-bold text-gray-800">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {result.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-red-50 p-5 rounded-xl border border-red-200">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <h3 className="text-xl font-bold text-gray-800">
                  Areas to Improve
                </h3>
              </div>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h3 className="text-xl font-bold text-gray-800">Suggestions</h3>
              </div>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Analysis Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Overall Assessment:
                </h4>
                <p className="text-gray-600">
                  Your SOP has a good foundation with clear structure and
                  grammar. Focus on adding specific achievements, personal
                  experiences, and unique details to increase originality and
                  impact.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Next Steps:
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Add measurable results and specific achievements</li>
                  <li>Reference specific university resources and faculty</li>
                  <li>Include unique personal experiences and perspectives</li>
                  <li>Review for redundant statements and tighten language</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons at the bottom */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={editSOP}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg"
            >
              Edit SOP
            </button>
            <button
              onClick={resetAnalysis}
              className="w-full sm:w-auto bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold text-lg"
            >
              New Analysis
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SOPAnalyzer;