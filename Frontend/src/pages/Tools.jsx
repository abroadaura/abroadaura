// Tools.jsx
import React, { useState } from 'react'
import UniversityFinder from '../components/Tools/UniversityFinder'
import CostCalculator from '../components/Tools/CostCalculator'
import EligibilityChecker from '../components/Tools/EligibilityChecker'
import { Search, Calculator, CheckCircle, ArrowRight } from 'lucide-react'

const Tools = () => {
  const [activeTab, setActiveTab] = useState("University Finder");

  const tools = [
    {
      title: "University Finder",
      description: "Discover your perfect university match worldwide",
      icon: <Search size={24} />,
      color: "from-blue-500 to-cyan-500",
      component: <UniversityFinder value={35}/> 
    },
    {
      title: "Cost Calculator", 
      description: "Plan your study abroad budget accurately",
      icon: <Calculator size={24} />,
      color: "from-purple-500 to-pink-500",
      component: <CostCalculator/> 
    },
    {
      title: "Eligibility Checker",
      description: "Check your chances for top universities",
      icon: <CheckCircle size={24} />,
      color: "from-green-500 to-emerald-500",
      component: <EligibilityChecker/> 
    }
  ]

  const activeComponent = tools.find(item => item.title === activeTab)?.component;
  const activeTool = tools.find(item => item.title === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Study Abroad <span className="text-[#0441b4]">Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed decisions with our comprehensive suite of study abroad tools
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tool.title)}
              className={`bg-white cursor-pointer rounded-2xl shadow-lg p-6 border transition-all duration-300 text-left ${
                activeTab === tool.title 
                  ? 'border-blue-500 shadow-xl ring-2 ring-blue-100' 
                  : 'border-gray-100 hover:shadow-xl'
              }`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.color} text-white mb-4`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600">{tool.description}</p>
            </button>
          ))}
        </div>

        {/* Active Tool Component */}
        <div className="bg-white overflow-hidden mb-12">
          <div className="md:p-6">
            {activeComponent}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-[#0441b4] to-[#0a63e9] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Personalized Guidance?</h3>
          <p className="mb-6 opacity-90">Our experts can help you navigate your study abroad journey</p>
          <button className="inline-flex items-center gap-2 bg-white text-[#0441b4] font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-colors duration-300">
            Book Free Consultation
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tools