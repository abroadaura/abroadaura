import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema({
  resume:String,
  info: Object,
  result: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ResumeAnalysis",resumeAnalysisSchema);
