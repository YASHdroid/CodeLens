require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",

  generationConfig: {
    responseMimeType: "application/json",
  },
});

function validateInterview(data) {
  if (!data) return false;

  if (typeof data.summary !== "string") return false;

  if (!Array.isArray(data.questions)) return false;

  for (const item of data.questions) {
    if (typeof item.question !== "string") return false;
    if (typeof item.answer !== "string") return false;
    if (typeof item.exampleCode !== "string") return false;
  }

  return true;
}

async function generateInterview(code, language = "JavaScript") {
  const prompt = `
You are an expert Software Engineer and Technical Interviewer.

Analyze the following ${language} code.

Return ONLY valid JSON.

The JSON MUST have this structure:

{
  "summary": "Short overview of the code.",

  "questions": [
    {
      "question": "Interview question",
      "answer": "Detailed answer in simple language.",
      "exampleCode": "Relevant example code."
    }
  ]
}

Rules:

- Generate 8 interview questions.

Difficulty:

2 Easy

3 Medium

3 Hard
- Start from beginner level and gradually increase the difficulty.
- Every question must have a detailed answer.
- Every question must include exampleCode.
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT wrap JSON inside \`\`\`.

Code:

${code}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  const interview = JSON.parse(response);

  console.log(JSON.stringify(interview, null, 2));

  if (!validateInterview(interview)) {
    throw new Error("Invalid AI response");
  }

  return interview;
}

module.exports = {
  generateInterview,
};