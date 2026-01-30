import React, { useState } from "react";
import ResumeResult from "./ResumeAnalyzer/ResumeResult";
import axios from "axios";
import { 
  UploadCloud, 
  FileText, 
  Globe, 
  Building2, 
  GraduationCap,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  User
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const ResumeAnalyzer = ({setShowMenu, fetchCredits, credits}) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const {user} = useAuth();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    country: "",
    university: "",
    course: "",
    sop: ""
  });
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please upload only PDF files");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!file) {
      alert("Please upload a PDF resume");
      return;
    }
    
    if (!formData.country.trim()) {
      alert("Please enter a country");
      return;
    }
    
    if (!formData.course.trim()) {
      alert("Please enter a course");
      return;
    }
    
    analyzeResume();
  };

  const analyzeResume = async (retry=0) => {
    setLoading(true);
    setShowMenu(false);

    const formDataPayloads = new FormData();
    formDataPayloads.append("resume", file);
    formDataPayloads.append("country", formData.country);
    formDataPayloads.append("university", formData.university);
    formDataPayloads.append("course", formData.course);
    formDataPayloads.append("sop", formData.sop);
    formDataPayloads.append("userId", user.uid);

    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      
    const res = await axios.post(
      `${baseUrl}/api/resume/analyze`,
      formDataPayloads,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
      setAnalysis(res?.data);
      fetchCredits();
    } catch (err) {
        if (retry < 1) {
      // wait a bit before retry (optional but nice)
      await new Promise((r) => setTimeout(r, 800));
      return analyzeProfile(profileData, retry + 1);
    }
      alert("Resume analysis failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { 
      name: "name", 
      label: "Your Name", 
      placeholder: "Ashu Maurya", 
      icon: <User size={18} />,
      required: true 
    },
    { 
      name: "country", 
      label: "Target Country", 
      placeholder: "USA, Canada, Germany", 
      icon: <Globe size={18} />,
      required: true 
    },
    { 
      name: "university", 
      label: "Target University", 
      placeholder: "University of Toronto", 
      icon: <Building2 size={18} />,
      required: true 
    },
    { 
      name: "course", 
      label: "Target Course/Program", 
      placeholder: "MS in Computer Science", 
      icon: <GraduationCap size={18} />,
      required: true 
    },
  ];

  return (
    <section className="max-w-7xl mx-auto md:px-4 md:py-16 py-10">
    {!analysis && (<form onSubmit={handleSubmit} className="bg-white rounded-2xl md:px-8">

      {/* Form Fields */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {inputFields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {field.icon}
              </div>
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full border placeholder-gray-300 border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required={field.required}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SOP Field */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Statement of Purpose Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          name="sop"
          placeholder="Briefly describe your motivation, goals, and why you're applying to this program..."
          value={formData.sop}
          onChange={handleInputChange}
          rows="4"
          required='true'
          className="w-full border placeholder-gray-300 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* File Upload Section */}
      <div 
        className={`mb-8 border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 bg-white p-4 rounded-xl shadow-sm">
              <FileText className="text-blue-600" size={24} />
              <div className="text-left">
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-green-600 flex items-center justify-center">
              <CheckCircle className="mr-2" size={16} />
              Resume/CV uploaded successfully
            </p>
          </div>
        ) : (
          <>
            <UploadCloud className="mx-auto text-gray-400 w-16 h-16 mb-4" />
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">Upload Your Resume</h3>
              <p className="text-gray-500 text-sm">
                Drag & drop your PDF resume/cv here or click to browse
              </p>
              <p className="text-xs text-gray-400">Maximum file size: 2MB</p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="inline-block mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading || !file || !credits}
          className="w-full md:w-auto bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto min-w-[200px]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <UploadCloud className="mr-2" size={20} />
              {credits ? "Analyze Resume" : "No Credits"}
            </>
          )}
        </button>
        
        <div className="mt-4 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="flex items-center">
            <AlertCircle size={14} className="mr-1" />
            Analysis may take up to 30 seconds
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Your data is processed securely</span>
        </div>
      </div>
    </form>)}

    {analysis && <ResumeResult analysis={analysis} formData={formData} />}
    
      {/* <ResumeResult analysis={analysis} formData={formData}/> */}
    </section>
  );
};

export default ResumeAnalyzer;
