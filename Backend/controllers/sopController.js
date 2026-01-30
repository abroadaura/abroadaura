import SopAnalysis from "../models/SopAnalysis.js";
import { analyzeSOPWithAI } from "../services/aiService.js";
import { consumeAICredit } from "../utils/consumeAICredit.js";

export const analyzeSOP = async (req, res) => {
  try {
    const { text, userId } = req.body;


    if (!text || text.length < 200) {
      return res.status(400).json({
        message: "SOP must be at least 200 characters",
      });
    }

        // 🔐 Credit check
    const credit = await consumeAICredit(userId);

    if (!credit.allowed) {
      return res.status(403).json({
        error: "Daily AI credits exhausted. Try again tomorrow.",
        creditsLeft: 0,
      });
    }
    

    const aiResult = await analyzeSOPWithAI(text);

    const saved = await SopAnalysis.create({
      text,
      clarityScore: aiResult.clarityScore,
      grammarScore: aiResult.grammarScore,
      structureScore: aiResult.structureScore,
      originalityScore: aiResult.originalityScore,
      strengths: aiResult.strengths,
      weaknesses: aiResult.weaknesses,
      improvementSuggestions: aiResult.improvementSuggestions,
      plagiarismRisk: aiResult.plagiarismRisk,
    });

    

    res.status(200).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "SOP analysis failed" });
  }
};
