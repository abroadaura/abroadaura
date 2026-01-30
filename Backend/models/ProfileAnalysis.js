import mongoose from "mongoose";

const profileAnalysisSchema = new mongoose.Schema({
  userId: String,
  profile: Object,
  result: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ProfileAnalysis",profileAnalysisSchema);
