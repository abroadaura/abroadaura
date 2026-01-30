import React, { useState } from "react";
import ProfileForm from "./Profile/ProfileForm";
import ProfileResult from "./Profile/ProfileResult";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ProfileAnalyzer = ({ setShowMenu, fetchCredits, credits }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [profileData, setProfileData] = useState(null);

  const {user} = useAuth();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const analyzeProfile = async (formData, retry = 0) => {
    setLoading(true);
    setError(null);
    setShowMenu(false);
    
    // Store profile data for retry
    if (retry === 0) {
      setProfileData(formData);
      setRetryCount(0);
    }

    try {
      const res = await axios.post(`/api/profile/analyze`, {
        profileData: formData, 
        userId: user.id
      }, {
        timeout: 30000 // 10 second timeout
      });
      
      setAnalysis(res?.data);
      setError(null);

    } catch (err) {
      const maxRetries = 2;
      
      if (retry < maxRetries) {
        // Auto-retry logic (kept from original)
        await new Promise((r) => setTimeout(r, 800 * (retry + 1)));
        return analyzeProfile(formData, retry + 1);
      } else {
        // After max retries, show error with retry button
        setRetryCount(retry);
        
        let errorMessage = "Profile analysis failed.";
        
        if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          errorMessage = "Server is taking too long to respond. The request may have timed out.";
        } else if (!err.response) {
          errorMessage = "Unable to connect to the server. Please check your internet connection.";
        } else {
          errorMessage = err.response?.data?.message || "Profile analysis failed. Please try again.";
        }
        
        setError({
          message: errorMessage,
          canRetry: true
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualRetry = () => {
    if (profileData) {
      analyzeProfile(profileData, 0);
    }
  };

  const handleCancelRetry = () => {
    setError(null);
    // setProfileData(null);
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setError(null);
    setProfileData(null);
  };

  return (
    <section className="max-w-6xl mx-auto py-4 md:p-6">
      {!analysis ? (
        <ProfileForm onAnalyze={analyzeProfile} loading={loading} credits={credits} initialData={profileData}/>
      ) : (
        <ProfileResult analysis={analysis} onReset={resetAnalysis} />
      ) }

      {/* Error Display with Retry Button */}
      {error && !analysis && (
        <div className="animate-fadeIn fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-red-100">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-red-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Analysis Failed
              </h3>
              
              
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                {error.canRetry && (
                  <button
                    onClick={handleManualRetry}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                  >
                    Try Again
                  </button>
                )}
                
                <button
                  onClick={handleCancelRetry}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200"
                >
                  Go Back
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                <p className="text-sm text-gray-500 mb-3">Troubleshooting tips:</p>
                <ul className="text-sm text-gray-600 text-left space-y-1 max-w-md mx-auto">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Check your internet connection
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Wait a moment and try again
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Contact support if the issue persists
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default ProfileAnalyzer;