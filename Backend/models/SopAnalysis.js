import mongoose from "mongoose";

const sopAnalysisSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId:String,
    clarityScore: Number,
    grammarScore: Number,
    structureScore: Number,
    originalityScore: Number,

    plagiarismRisk: String,

    strengths: [String],
    weaknesses: [String],
    improvementSuggestions: [String],
  },
  { timestamps: true }
);

export default mongoose.model("SopAnalysis", sopAnalysisSchema);
