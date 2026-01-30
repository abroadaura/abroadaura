import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const ProfileForm = ({ onAnalyze, loading, credits, initialData }) => {
  const {user} = useAuth();
  const [form, setForm] = useState(initialData || {
    userId: user?.uid,
    course: "",
    cgpa: "",
    ielts: "",
    gre: "",
    workExperience: "",
    extracurricular:"",
    projects: "",
    internships: "",
    countryPreference: "",
  });



  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const cgpa = parseFloat(form.cgpa);
    if (cgpa < 0 || cgpa > 10) {
      alert("CGPA must be between 0 and 10");
      return;
    }
    
    const ielts = parseFloat(form.ielts);
    if (form.ielts && (ielts < 0 || ielts > 9)) {
      alert("IELTS score must be between 0 and 9");
      return;
    }
    
    const gre = parseInt(form.gre);
    if (form.gre && (gre < 260 || gre > 340)) {
      alert("GRE score must be between 260 and 340");
      return;
    }

    onAnalyze({
      ...form,
      cgpa: cgpa,
      ielts: form.ielts ? ielts : null,
      gre: form.gre ? gre : null,
      workExperience: parseInt(form.workExperience) || 0,
      extracurricular: form.extracurricular.split(",").map(e => e.trim()).filter(e => e),
      projects: form.projects.split(",").map(p => p.trim()).filter(p => p),
      internships: form.internships.split(",").map(i => i.trim()).filter(i => i),
      countryPreference: form.countryPreference.split(",").map(c => c.trim()).filter(c => c),
    });
  };

  const inputFields = [
    { name: "course", label: "Major", placeholder: "e.g., MS in Computer Science", required: true },
    { name: "cgpa", label: "CGPA / Percentage", placeholder: "e.g., 8.5 or 85%", required: true },
    { name: "ielts", label: "IELTS Score", placeholder: "", required: true },
    { name: "gre", label: "GRE Score", placeholder: "" },
    { name: "workExperience", label: "Work Experience (years)", placeholder: "" },
    { name: "countryPreference", label: "Preferred Countries", placeholder: "USA, Canada, UK, Australia",required: true },
    { name: "projects", label: "Key Projects", placeholder: "ML research, Web app etc.", type: "textarea", required: true },
    { name: "internships", label: "Internships", placeholder: "Google, Microsoft, Startup", type: "textarea" },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl">
      <div className="grid md:grid-cols-2 gap-6">
        {inputFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3.5 placeholder-gray-300 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                required={field.required}
              />
            ) : (
              <input
                type={field.name === "course" || "countryPreference" ? "text" : "number"}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                step={field.name === "cgpa" || field.name === "ielts" ? "0.1" : "1"}
                className="w-full px-4 py-3.5 placeholder-gray-300 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                required={field.required}
              />
            )}
          </div>
        ))}
      </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Extracurriculars
            </label>
              <textarea
                name='extracurricular'
                placeholder='extracurricular activites'
                value={form['extracurricular']}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3.5 placeholder-gray-300 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
          </div>
      
      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={loading || !credits}
          className="w-full md:w-auto bg-blue-700  text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Profile...
            </>
          ) : (
            <>
              {credits ? "Analyze Profile" : "No credts"}
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-500 mt-4">
          ✨ AI will evaluate your profile and provide personalized recommendations
        </p>
      </div>
    </form>
  );
};

export default ProfileForm