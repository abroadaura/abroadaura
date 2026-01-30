import React, { useState } from "react";
import axios from "axios";
import { 
  TrendingUp, 
  Target, 
  Globe, 
  Award, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb,
  ChevronRight,
  BookOpen,
  BarChart3,
  Users,
  Building
} from "lucide-react";

const CountryChance = ({ country, percentage }) => {
  const getColor = (percent) => {
    if (percent >= 70) return "from-green-500 to-emerald-600";
    if (percent >= 50) return "from-yellow-500 to-amber-600";
    return "from-red-500 to-pink-600";
  };
  
  const getFlag = (country) => {
    const flags = {
    USA: "https://flagcdn.com/us.svg",
    Canada: "https://flagcdn.com/ca.svg",
    UK: "https://flagcdn.com/gb.svg",
    Australia: "https://flagcdn.com/au.svg",
    Germany: "https://flagcdn.com/de.svg",
    France: "https://flagcdn.com/fr.svg",
    Netherlands: "https://flagcdn.com/nl.svg",
    Singapore: "https://flagcdn.com/sg.svg",
    "New Zealand": "https://flagcdn.com/nz.svg",
    Ireland: "https://flagcdn.com/ie.svg"
    };
    return flags[country] || "🌍";
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* <span className="text-2xl">{getFlag(country)}</span> */}
          <div className="rounded-full border border-gray-200 w-10 h-10 p-0.5 flex items-center justify-center">
            <img src={getFlag(country)} className="p-1" alt="" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{country}</h4>
            <p className="text-xs text-gray-500">Admission Chance</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold bg-gradient-to-r ${getColor(percentage)} bg-clip-text text-transparent`}>
            {percentage}%
          </div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${getColor(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CountryChance