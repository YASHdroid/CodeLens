require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",

  generationConfig: {
    responseMimeType: "application/json",
  },
});


function validateInterview(data) {
  if (!data) return false;

  if (typeof data.title !== "string") return false;

  if (typeof data.summary !== "string") return false;

  if (!Array.isArray(data.questions)) return false;

  for (const item of data.questions) {

    if (typeof item.question !== "string")
      return false;

    if (typeof item.answer !== "string")
      return false;

    if (typeof item.exampleCode !== "string")
      return false;
  }

  return true;
}


async function generateInterview(
  code,
  language = "JavaScript"
) {

  const prompt = `
You are an expert Software Engineer and Technical Interviewer.

Analyze the following ${language} code.

Return ONLY valid JSON.

The JSON MUST have this exact structure:

{
  "title": "Short 3-6 word title for this interview session",
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

- Generate exactly 8 interview questions.
- 2 Easy questions.
- 3 Medium questions.
- 3 Hard questions.
- Start from beginner level and gradually increase difficulty.
- Every question must have a detailed answer.
- Every question must include exampleCode.
- The title should be short and describe the main concept of the code.
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT wrap JSON inside code fences.

Code:

${code}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  const interview = JSON.parse(response);

  console.log(
    JSON.stringify(interview, null, 2)
  );

  if (!validateInterview(interview)) {
    throw new Error("Invalid AI response");
  }

  return interview;
}


module.exports = {
  generateInterview,
};