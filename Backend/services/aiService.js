import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  baseURL: "https://api.a4f.co/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeSOPWithAI = async (text) => {
  const prompt = `
You are an expert university admissions counselor and academic writing evaluator.

Analyze the given Statement of Purpose (SOP) strictly and objectively.

Return ONLY valid JSON (no markdown, no explanation, no extra text).

Score each category from 0 to 10.

Evaluation categories:
- clarityScore
- grammarScore
- structureScore
- originalityScore

Also include:
- strengths (array of strings)
- weaknesses (array of strings)
- improvementSuggestions (array of strings)
- plagiarismRisk ("Low" | "Medium" | "High")

If the SOP is very weak, do NOT inflate scores.
Be honest and critical like a real admission officer.


SOP:
"""
${text}
"""
`;


  const response = await client.chat.completions.create({
    model: "provider-6/gpt-oss-20b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

// console.log(response.choices[0].message.content)

  return JSON.parse(response.choices[0].message.content);
};