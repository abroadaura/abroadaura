import express from "express";
import upload from "../middleware/upload.js";
import pdfParse from "pdf-parse";
import OpenAI from "openai";
import dotenv from "dotenv";
import { consumeAICredit } from "../utils/consumeAICredit.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
dotenv.config();

const router = express.Router();

const client = new OpenAI({
  baseURL: "https://api.a4f.co/v1",
  apiKey: process.env.OPENAI_API_KEY,
});


router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF required" });
    }
    
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const info = req.body;

    // 🔐 Credit check
    const credit = await consumeAICredit(info.userId);

    if (!credit.allowed) {
      return res.status(403).json({
        error: "Daily AI credits exhausted. Try again tomorrow.",
        creditsLeft: 0,
      });
    }

    const systemPrompt = `
    You are a senior university admissions officer and academic CV evaluator.

    Evaluate the student's CV and Statement of Purpose (SOP) to assess their suitability for admission to the university "${info.university}" for the course "${info.course}" in the country "${info.country}".
    The applicant is applying as an international student (undergraduate or postgraduate).

    Evaluate strictly as a real admissions committee would.
    Focus on academic depth, subject relevance, intellectual preparedness, extracurricular quality, and clarity of presentation.
    Do NOT evaluate corporate ATS keywords.

    Return ONLY valid JSON.
    No markdown. No explanations. No extra text.

    VALIDATION RULE:

    Before evaluating the profile, first validate these only:
    1. The university exists and is located in the specified country.
    2. The course is realistically offered by the specified university.
    3. The course level (UG/PG) matches typical offerings at that institution.

    If any of the above checks fail:
    - error (summary about the error if not any error set it 0)

    If all of the above checks pass then evaluate:
    Score each category from 0 to 10 (fractions allowed):

    - academicStrengthScore
    - courseRelevanceScore
    - extracurricularScore
    - formattingAndClarityScore
    - admissionChances

    Also include:

    - profileLevel ("Weak" | "Average" | "Strong")
    - strengths (array of concise strings)
    - weaknesses (array of concise strings)
    - improvementSuggestions (array of actionable strings)
    - recommendedUniversityTier ("Top-tier" | "Mid-tier" | "Safe")
    - summary (2–3 sentence professional admissions-style evaluation)

    Ensure the JSON is syntactically valid and complete.
    `;


    const userPrompt = `
    STUDENT SOP : ${info.sop}
    CV TEXT:
    ${resumeText}`;

    const response = await client.chat.completions.create({
        model: "provider-6/gpt-oss-20b",
        messages: [{ role: "system", content: systemPrompt },{ role: "user", content: userPrompt }],
        temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content);

    await ResumeAnalysis.create({
        resume:resumeText,
        info,
        result,
    });
    
    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Resume analysis failed" });
  }
});

export default router;
