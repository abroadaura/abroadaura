// UniversityFinder.jsx
import React, { useState } from "react";
import { Search, MapPin, GraduationCap, DollarSign, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const universities = [
  {
    name: "Massachusetts Institute of Technology (MIT)",
    country: "USA",
    course: "Computer Science (BS)",
    category: "CS",
    fee: 62210, // USD per year (2024-2025 actual)
    ranking: "#1 rank in World",
    duration: "4 Years",
    logo: "🇺🇸"
  },
  {
    name: "Imperial College London",
    country: "UK",
    course: "Engineering (General)",
    category: "Engineering",
    fee: 40940, // USD (approx: £32,000 GBP = ~$40,940 USD)
    ranking: "Top 10 in UK & World",
    duration: "3 Years",
    logo: "🇬🇧"
  },
  {
    name: "University of Oxford",
    country: "UK",
    course: "Engineering & CS",
    category: "Engineering",
    fee: 43400, // USD (approx: £33,950 GBP = ~$43,400 USD)
    ranking: "Top 5 in World",
    duration: "3-4 Years",
    logo: "🇬🇧"
  },
  {
    name: "Harvard University",
    country: "USA",
    course: "Business/Economics",
    category: "Business",
    fee: 61043, // USD per year (2024-2025 actual)
    ranking: "Top 5 in World",
    duration: "4 Years",
    logo: "🇺🇸"
  },
  {
    name: "University of Cambridge",
    country: "UK",
    course: "Engineering (General)",
    category: "Engineering",
    fee: 43400, // USD (approx: £33,950 GBP = ~$43,400 USD)
    ranking: "Top 10 in World",
    duration: "3-4 Years",
    logo: "🇬🇧"
  },
  {
    name: "University College London (UCL)",
    country: "UK",
    course: "Computer Science (BSc)",
    category: "CS",
    fee: 42140, // USD (approx: £33,000 GBP = ~$42,140 USD)
    ranking: "Top 20 in World",
    duration: "3 Years",
    logo: "🇬🇧"
  },
  {
    name: "National University of Singapore (NUS)",
    country: "Singapore",
    course: "Engineering",
    category: "Engineering",
    fee: 26120, // USD (approx: 35,000 SGD = ~$26,120 USD)
    ranking: "Top 15 in World",
    duration: "4 Years",
    logo: "🇸🇬"
  },
  {
    name: "Tsinghua University",
    country: "China",
    course: "Computer Science & Engineering",
    category: "Engineering",
    fee: 6250, // USD (approx: 40,000-45,000 CNY = ~$5,600-$6,250 USD)
    ranking: "Top 20–30 in World",
    duration: "4 Years",
    logo: "🇨🇳"
  },
  {
    name: "RWTH Aachen University",
    country: "Germany",
    course: "Mechanical & Electrical Engineering",
    category: "Engineering",
    fee: 350, // USD (semester fee for all students ~€320 = ~$350 USD)
    ranking: "Top 100 in World",
    duration: "3–4 Years",
    logo: "🇩🇪"
  },
  {
    name: "University of California, Berkeley",
    country: "USA",
    course: "Engineering/CS",
    category: "CS",
    fee: 48984, // USD (out-of-state tuition 2024-2025)
    ranking: "Top 10 in World",
    duration: "4 Years",
    logo: "🇺🇸"
  },
  {
    name: "University of Michigan, Ann Arbor",
    country: "USA",
    course: "Engineering",
    category: "Engineering",
    fee: 58838, // USD (out-of-state tuition 2024-2025)
    ranking: "Top 30 in World",
    duration: "4 Years",
    logo: "🇺🇸"
  },
  {
    name: "Carnegie Mellon University",
    country: "USA",
    course: "Computer Science (BS)",
    category: "CS",
    fee: 63500, // USD (2024-2025 actual)
    ranking: "Top 10 in World (CS)",
    duration: "4 Years",
    logo: "🇺🇸"
  },
  {
    name: "University of Sydney",
    country: "Australia",
    course: "Business & Law",
    category: "Business & Law",
    fee: 36360, // USD (approx: 55,000 AUD = ~$36,360 USD)
    ranking: "Top 20 in Australia",
    duration: "3–4 Years",
    logo: "🇦🇺"
  },
  {
    name: "Australian National University (ANU)",
    country: "Australia",
    course: "International Relations",
    category: "International Relations",
    fee: 33264, // USD (approx: 50,400 AUD = ~$33,264 USD)
    ranking: "Top 5 in Australia",
    duration: "3–4 Years",
    logo: "🇦🇺"
  },
  {
    name: "University of Queensland (UQ)",
    country: "Australia",
    course: "Biological Sciences",
    category: "BS",
    fee: 31878, // USD (approx: 48,300 AUD = ~$31,878 USD)
    ranking: "Top 50 in World",
    duration: "3–4 Years",
    logo: "🇦🇺"
  },
  {
    name: "Stanford University",
    country: "USA",
    course: "Computer Science (BS)",
    category: "CS",
    fee: 65282, // USD (2024-2025 actual)
    ranking: "#3 in World (QS 2025)",
    duration: "4 Years",
    logo: "🇺🇸"
  },
  {
    name: "ETH Zurich",
    country: "Switzerland",
    course: "Mechanical Engineering (BSc)",
    category: "Engineering",
    fee: 1670, // USD (CHF 1,460 per semester = ~$1,670 USD/year)
    ranking: "#7 in World (QS 2025)",
    duration: "3 Years",
    logo: "🇨🇭"
  },
  {
    name: "University of Toronto",
    country: "Canada",
    course: "Computer Science (BSc)",
    category: "CS",
    fee: 41816, // USD (approx: 57,020 CAD = ~$41,816 USD)
    ranking: "#21 in World (QS 2025)",
    duration: "4 Years",
    logo: "🇨🇦"
  },
  {
    name: "University of Tokyo",
    country: "Japan",
    course: "Engineering (BEng)",
    category: "Engineering",
    fee: 5350, // USD (approx: 535,800 JPY = ~$3,400 USD tuition + $1,950 fees)
    ranking: "#28 in World (QS 2025)",
    duration: "4 Years",
    logo: "🇯🇵"
  },
  {
    name: "Seoul National University",
    country: "South Korea",
    course: "Computer Science & Engineering",
    category: "Engineering",
    fee: 6900, // USD (approx: 9,250,000 KRW = ~$6,900 USD)
    ranking: "#41 in World (QS 2025)",
    duration: "4 Years",
    logo: "🇰🇷"
  },
  {
    name: "Delft University of Technology",
    country: "Netherlands",
    course: "Aerospace Engineering (BSc)",
    category: "Engineering",
    fee: 18300, // USD (approx: €17,000 = ~$18,300 USD)
    ranking: "#47 in World (QS 2025)",
    duration: "3 Years",
    logo: "🇳🇱"
  },
  {
    name: "University of Hong Kong",
    country: "Hong Kong",
    course: "Business Analytics (BBA)",
    category: "Business",
    fee: 23800, // USD (approx: 182,000 HKD = ~$23,800 USD)
    ranking: "#26 in World (QS 2025)",
    duration: "4 Years",
    logo: "🇭🇰"
  },
  {
    name: "University of Copenhagen",
    country: "Denmark",
    course: "Biotechnology (BSc)",
    category: "BS",
    fee: 18200, // USD (approx: €16,800 = ~$18,200 USD for non-EU)
    ranking: "#107 in World (QS 2025)",
    duration: "3 Years",
    logo: "🇩🇰"
  },
  {
    name: "University of Cape Town",
    country: "South Africa",
    course: "Medicine (MBChB)",
    category: "Medicine",
    fee: 24000, // USD (approx: 450,000 ZAR = ~$24,000 USD for international)
    ranking: "#173 in World (QS 2025)",
    duration: "6 Years",
    logo: "🇿🇦"
  },
  {
    name: "KAIST",
    country: "South Korea",
    course: "Electrical Engineering (BSc)",
    category: "Engineering",
    fee: 8700, // USD (approx: 11,900,000 KRW = ~$8,700 USD)
    ranking: "#56 in World (QS 2025)",
    duration: "4 Years",
    logo: "🇰🇷"
  },
  {
    name: "Technical University of Munich",
    country: "Germany",
    course: "Informatics (BSc)",
    category: "CS",
    fee: 330, // USD (semester fee ~€150 = ~$165 × 2 = $330 USD/year)
    ranking: "#37 in World (QS 2025)",
    duration: "3 Years",
    logo: "🇩🇪"
  },
  {
  name: "University of Edinburgh",
  country: "UK",
  course: "Artificial Intelligence (BSc)",
  category: "CS",
  fee: 40940, // USD (approx: £32,000 GBP = ~$40,940 USD)
  ranking: "#22 in World (QS 2025)",
  duration: "4 Years",
  logo: "🇬🇧"
},
{
  name: "University of Amsterdam",
  country: "Netherlands",
  course: "Psychology (BSc)",
  category: "BS",
  fee: 15120, // USD (approx: €14,000 = ~$15,120 USD)
  ranking: "#53 in World (QS 2025)",
  duration: "3 Years",
  logo: "🇳🇱"
},
{
  name: "University of Auckland",
  country: "New Zealand",
  course: "Architecture (BArch)",
  category: "Architecture",
  fee: 26400, // USD (approx: 43,000 NZD = ~$26,400 USD)
  ranking: "#68 in World (QS 2025)",
  duration: "3 Years",
  logo: "🇳🇿"
},
{
  name: "Peking University",
  country: "China",
  course: "Economics (BA)",
  category: "Business",
  fee: 5600, // USD (approx: 40,000 CNY = ~$5,600 USD)
  ranking: "#14 in World (QS 2025)",
  duration: "4 Years",
  logo: "🇨🇳"
},
{
  name: "University of Helsinki",
  country: "Finland",
  course: "Data Science (BSc)",
  category: "CS",
  fee: 16200, // USD (approx: €15,000 = ~$16,200 USD for non-EU)
  ranking: "#115 in World (QS 2025)",
  duration: "3 Years",
  logo: "🇫🇮"
},
{
  name: "Indian Institute of Technology Delhi",
  country: "India",
  course: "Computer Science (BTech)",
  category: "CS",
  fee: 8400, // USD (approx: 700,000 INR = ~$8,400 USD for international)
  ranking: "#197 in World (QS 2025)",
  duration: "4 Years",
  logo: "🇮🇳"
},
{
  name: "University of São Paulo",
  country: "Brazil",
  course: "Civil Engineering (BEng)",
  category: "Engineering",
  fee: 0, // Tuition-free for all students (only small admin fees)
  ranking: "#85 in World (QS 2025)",
  duration: "5 Years",
  logo: "🇧🇷"
},
{
  name: "University of British Columbia",
  country: "Canada",
  course: "Commerce (BCom)",
  category: "Business",
  fee: 47450, // USD (approx: 65,000 CAD = ~$47,450 USD)
  ranking: "#34 in World (QS 2025)",
  duration: "4 Years",
  logo: "🇨🇦"
},
{
  name: "Lomonosov Moscow State University",
  country: "Russia",
  course: "Physics (BSc)",
  category: "BS",
  fee: 6500, // USD (approx: 600,000 RUB = ~$6,500 USD for international)
  ranking: "#87 in World (QS 2025)",
  duration: "4 Years",
  logo: "🇷🇺"
}
];


const UniversityFinder = ({value}) => {
  const [filters, setFilters] = useState({
    country: "",
    course: "",
    budget: "",
  });


  const filteredUniversities = universities.filter((u) =>
    (!filters.country || u.country === filters.country) &&
    (!filters.category || u.category === filters.category) &&
    (!filters.budget || u.fee <= filters.budget)
  );

  return (
    <div className="md:p-6 p-1 rounded-2xl bg-blue-50">
      {/* Filter Section */}
      <div className="bg-blue-50 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Search size={20} className="text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">
            Filter Universities
          </h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
              value={filters.country}
              onChange={(e) =>
                setFilters({ ...filters, country: e.target.value })
              }
            >
              <option value="">All Countries</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="China">China</option>
              <option value="South Korea">South Korea</option>
              <option value="Japan">Japan</option>
              <option value="Switzerland">Switzerland</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            />
          </div>

          <div className="relative">
            <GraduationCap
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
            <select
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Courses</option>
              <option value="Engineering">Engineering (General)</option>
              <option value="Business">Business & Economics</option>
              <option value="CS">CS & Engineering</option>
              <option value="Architecture">Architectures (BArch)</option>
              <option value="medicine">Medical Science</option>
              <option value="business & law">Business & Law</option>
              <option value="International Relations">
                International Relations
              </option>
              <option value="BS">Other Bachelors Degree</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
            />
          </div>

          <div className="relative">
            <DollarSign
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="number"
              placeholder="Max Budget (USD)"
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={filters.budget}
              onChange={(e) =>
                setFilters({ ...filters, budget: e.target.value })
              }
            />
          </div>

          <button
            onClick={() => setFilters({ country: "", course: "", budget: "" })}
            className="px-4 py-3 border border-gray-300 bg-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Found {filteredUniversities.length} Universities
          </h3>
        </div>

        {filteredUniversities.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredUniversities.slice(0, value).map((u, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{u.logo}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {u.name}
                      </h4>
                      <p className="text-gray-600">{u.country}</p>
                    </div>
                  </div>
                  <span className="md:text-sm text-xs text-center font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                    {u.ranking}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <p className="text-gray-500">Course</p>
                    <p className="font-medium">{u.course}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{u.duration}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Annual Fee</p>
                    <p className="font-medium text-green-600">
                      ${u.fee.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Total (approx.)</p>
                    <p className="font-medium">
                      $
                      {(
                        u.fee * (u.duration.includes("2") ? 2 : 4)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              No universities found
            </h4>
            <p className="text-gray-500">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityFinder;