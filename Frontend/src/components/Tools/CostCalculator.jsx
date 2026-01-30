// CostCalculator.jsx
import React, { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Home, FileText } from "lucide-react";

const CostCalculator = () => {
  const [cost, setCost] = useState({
    tuition: "",
    living: "",
    visa: "",
    insurance: "",
    books: "",
    travel: "",
  });

  const [duration, setDuration] = useState(4);
  const [currency, setCurrency] = useState("USD");

  const exchangeRates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    AUD: 1.52,
  };

  const annualTotal = 
    Number(cost.tuition || 0) + 
    Number(cost.living || 0) + 
    Number(cost.visa || 0) + 
    Number(cost.insurance || 0) + 
    Number(cost.books || 0) + 
    Number(cost.travel || 0);

  const totalCost = annualTotal * duration;
  const convertedTotal = totalCost * exchangeRates[currency];

  const expenseItems = [
    { label: "Tuition Fees", value: cost.tuition, icon: <Calculator size={18} />, color: "bg-blue-100 text-blue-600" },
    { label: "Living Cost", value: cost.living, icon: <Home size={18} />, color: "bg-green-100 text-green-600" },
    { label: "Visa Fees", value: cost.visa, icon: <FileText size={18} />, color: "bg-purple-100 text-purple-600" },
    { label: "Insurance", value: cost.insurance, icon: <TrendingUp size={18} />, color: "bg-red-100 text-red-600" },
    { label: "Books & Materials", value: cost.books, icon: <FileText size={18} />, color: "bg-yellow-100 text-yellow-600" },
    { label: "Travel", value: cost.travel, icon: <TrendingUp size={18} />, color: "bg-cyan-100 text-cyan-600" },
  ];

  return (
    <div className="md:p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Duration Selector */}
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Study Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((years) => (
                <button
                  key={years}
                  onClick={() => setDuration(years)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    duration === years
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-300"
                  }`}
                >
                  {years} Year{years > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Expense Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            {expenseItems.map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    {item.icon}
                  </div>
                  <label className="font-medium text-gray-700">{item.label}</label>
                </div>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={item.value}
                    onChange={(e) => setCost({ ...cost, [item.label.toLowerCase().split(' ')[0]]: e.target.value })}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">USD</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Cost Summary</h3>
              
              {/* Currency Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View in Currency
                </label>
                <select
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="AUD">Australian Dollar (AUD)</option>
                </select>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Cost</span>
                  <span className="font-semibold">
                    {currency} {annualTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{duration} Year{duration > 1 ? 's' : ''}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Cost</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-700">
                        {currency} {convertedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-gray-500">
                        ≈ USD {totalCost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Monthly Budget</h4>
                <div className="text-2xl font-bold text-green-600">
                  {currency} {(annualTotal / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/month
                </div>
                <p className="text-sm text-gray-500 mt-1">Including all expenses</p>
              </div>

              {/* Action Button */}
              {/* <button className="w-full mt-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5">
                Download Budget Plan
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;