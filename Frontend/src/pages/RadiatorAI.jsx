import React, { useState } from 'react'
import SOPAnalyzer from '../components/RadiatorAI/SOPAnalyzer'
import { Home,  ScanText, Brain, ChevronRight, Sparkles, User, NotepadText, ChevronLeft } from "lucide-react";
import ProfileAnalyzer from '../components/RadiatorAI/ProfileAnalyzer';
import ResumeAnalyzer from '../components/RadiatorAI/ResumeAnalyzer';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RadiatorAI = () => {
    const [activeTab, setActiveTab] = useState("Profile Analyzer");
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    // const {loading} = useNotification();
    const [credits, setCredits] = useState();
    const navigate = useNavigate()

    const {user} = useAuth();

    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchCredits = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/credits`, {
          params: { userId: user?.uid },
        });

        setCredits(res?.data?.creditsLeft);
        setLoading(false);
      } catch (err) {
        console.log("Failed to fetch credits");
      }
    };



      useEffect(() => {
        fetchCredits();
      }, [user]);

    const menuItems = [
      { 
        label: "Profile Analyzer", 
        icon: <User size={22} />, 
        description: "Analyze your academic & professional profile",
        color: "bg-blue-100",
        component: <ProfileAnalyzer fetchCredits={fetchCredits} credits={credits} showMenu={showMenu} setShowMenu={setShowMenu}/> 
      },

      { 
        label: "SOP Analyzer", 
        icon: <NotepadText size={22} />, 
        description: "Perfect your Statement of Purpose",
        color: "bg-blue-100 ",
        component: <SOPAnalyzer fetchCredits={fetchCredits} credits={credits} showMenu={showMenu} setShowMenu={setShowMenu}/> 
      },
      { 
        label: "Resume Analyzer", 
        icon: <ScanText size={22} />, 
        description: "Optimize your resume/CV",
        color: "bg-blue-100",
        component: <ResumeAnalyzer fetchCredits={fetchCredits} credits={credits} showMenu={showMenu} setShowMenu={setShowMenu}/> 
      }

    ];

    const activeComponent = menuItems.find(item => item.label === activeTab)?.component;

  return (
    <div className="min-h-screen max-w-7xl md:mx-7">

    {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <p className="font-semibold text-gray-900">Setting up Analyzer</p>
              <p className="text-sm text-gray-600">This will take upto 30s</p>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mx-auto md:ml-2 p-4 md:p-6 hidden md:block">
        <div className=" flex items-center space-x-2 text-sm text-gray-500">
          <Home size={16} />
          <ChevronRight size={16} />
          <span>RadiatorAI</span>
          <ChevronRight size={16} />
          <span className="text-blue-600 font-medium">{activeTab}</span>
        </div>
      </div>

      <div className="p-4 md:px-6 ">
        <div className="flex flex-col lg:flex-row gap-6 ">

          {/* Left Sidebar */}
          {showMenu && (
            <div className={`lg:w-1/4 ${showMenu ? "" : "hidden"} `}>
            <div className="bg-white rounded-2xl md:shadow-xl md:p-6 mb-6 ">
              <div className="flex items-center justify-center space-x-1 py-1 mb-2 rounded-2xl ">
                <img src="./sparkles.png" className="w-[30px] md:w-[30px] rounded-lg" alt="" />

                <div>
                  <h1 className="text-xl text-[#0441b4] font-semibold relative">
                    Radiator
                    <span className="absolute left-22 -top-1 text-sm">AI</span>
                  </h1>
                </div>
              </div>

              <nav className="space-y-2 ">
                {menuItems.map((item, idx) => (
                  <button
                  
                    key={idx}
                    onClick={() => {setActiveTab(item.label);setShowMenu(false)}}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      activeTab === item.label
                        ? ` ${item.color} text-gray-800 shadow-lg transform scale-[1.02]`
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activeTab === item.label
                            ? "bg-white/50"
                            : "bg-gray-200"
                        }`}
                      >
                        {React.cloneElement(item.icon, {
                          className:
                            activeTab === item.label
                              ? "text-blue-600"
                              : `text-gray-600`,
                        })}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{item.label}</h3>
                        <p
                          className={`text-sm ${
                            activeTab === item.label
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Additional Resources */}
            <div className="my-6 grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-800 mb-2">
                  AI Credits
                </h4>
                <p className="text-sm text-gray-600">
                  ⚡{credits} credits left for today
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Document Templates
                </h4>
                <p className="text-sm text-gray-600">
                  Access professionally designed templates
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <h4 className="font-semibold text-gray-800 mb-2">
                  University Guides
                </h4>
                <p className="text-sm text-gray-600">
                  Get specific university requirements
                </p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5 hidden md:block">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <Sparkles size={18} className="mr-2 text-blue-500" />
                Pro Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Be specific about achievements with numbers
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Tailor content to each university/program
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Use active voice and strong action verbs
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-sm text-gray-700">
                    Proofread for grammar and consistency
                  </span>
                </li>
              </ul>
            </div>            

          </div>
          )}


          {/* Right Content Area */}
          <div className={`${showMenu ? 'lg:w-3/4' : 'lg:w-full'}`}>

          {/* Menu Toggle Button for when sidebar is hidden */}
            {!showMenu && (
              <div className="mb-4">
                <button
                  onClick={() => setShowMenu(true)}
                  className="flex items-center gap-1 group p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow hover:bg-gray-100 cursor-pointer"
                >
                {/* <p className=" text-3xl text-transparent bg-linear-to-r from-blue-700 to-blue-300 bg-clip-text relative">✨</p> */}
                  <img src="./sparkles.png" className="w-[27px] md:w-[30px] rounded-lg" alt="" />
                  <span className="font-medium text-gray-700 group-hover:pr-0.5">Show Menu</span>
                  <ChevronLeft size={20} className="transform rotate-180 mr-2" />
                </button>
              </div>

              
            )}

            <div className="bg-white rounded-2xl md:shadow-xl p-1 md:p-6">
              {/* Tab Header */}
              <div className="md:p-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#0441b4]">
                    {activeTab}
                  </h1>
                  <p className="text-gray-600 md:text-sm text-xs mt-1">
                    {activeTab === "Profile Analyzer" &&
                      "Get insights on how to strengthen your academic and professional profile"}
                    {activeTab === "SOP Analyzer" &&
                      "AI-powered analysis of your Statement of Purpose with detailed feedback"}
                    {activeTab === "Resume Analyzer" &&
                      "Optimize your resume with AI-driven suggestions and score improvement"}
                  </p>
                  <div className="w-full h-1 bg-blue-700 mt-4 md:mb-6"></div>
                </div>
              </div>

              {/* Divider */}
              {/* <div className="h-px bg-linear-to-r from-blue-500  via-gray-300 to-transparent mb-8"></div> */}

              {/* Active Component */}
              <div className="animate-fadeIn">{activeComponent}</div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Brain size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        AI Analysis Note
                      </p>
                      <p className="text-xs text-gray-500">
                        Results are generated using advanced AI and should be
                        reviewed carefully
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default RadiatorAI 