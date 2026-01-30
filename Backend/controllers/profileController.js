import OpenAI from "openai";
import dotenv from "dotenv";
import { consumeAICredit } from "../utils/consumeAICredit.js";
import ProfileAnalysis from "../models/ProfileAnalysis.js";
dotenv.config();

const client = new OpenAI({
  baseURL: "https://api.a4f.co/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeProfile = async (req, res) => {
  const profileData = req.body;
  const profile = profileData.profileData;

  if (!profile.cgpa || !profile.course) {
    return res.status(400).json({ message: "Incomplete profile" });
  }

  const prompt = `
You are a senior university admissions evaluator.

Analyze the student profile for international education admissions.

Evaluate extracurricular activities and leadership where relevant,
especially for USA and top-tier universities.

Return ONLY valid JSON.
No markdown. No explanations.

Score each category from 0 to 10 fractions are allowed.

Evaluation categories:
- academicsScore
- testScoresScore
- profileStrengthScore
- admissionReadinessScore
- extracurricularScore

Also include:
- profileLevel ("Weak" | "Average" | "Strong")
- chancesByCountry (object with country name → percentage)
- strengths (array of strings)
- weaknesses (array of strings)
- improvementSuggestions (array of strings)
- recommendedUniversityTier ("Top-tier" | "Mid-tier" | "Safe")
- summary

Be realistic and strict like a real admissions officer.
Do not inflate scores.

STUDENT PROFILE:
${JSON.stringify(profile, null, 2)}
`;

    console.log("first1")
    // 🔐 Credit check
    const credit = await consumeAICredit(profile.userId);
      console.log("first3")
    if (!credit.allowed) {
      return res.status(403).json({
        error: "Daily AI credits exhausted. Try again tomorrow.",
        creditsLeft: 0,
      });
    }

  const response = await client.chat.completions.create({
    model: "provider-6/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const result = JSON.parse(response.choices[0].message.content);

  await ProfileAnalysis.create({
        userId: profile.userId,
        profile,
        result,
  });

  res.json(result);
}