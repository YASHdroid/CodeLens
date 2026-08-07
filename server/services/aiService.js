require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",

  generationConfig: {
    responseMimeType: "application/json",
  },
});

function validateReview(review) {

  if (!review) return false;
  if (typeof review.title !== "string") {
  return false;
}
  if (typeof review.summary !== "string") return false;
  if (typeof review.fixedCode !== "string") return false;

  if (!Array.isArray(review.bugs)) return false;
  if (!Array.isArray(review.suggestions)) return false;
  if (!Array.isArray(review.interviewQuestions)) return false;

  for (const bug of review.bugs) {
    if (typeof bug.severity !== "string") return false;
    if (typeof bug.category !== "string") return false;
    if (typeof bug.issue !== "string") return false;
    if (typeof bug.explanation !== "string") return false;
    if (typeof bug.correctCode !== "string") return false;
  }

  for (const suggestion of review.suggestions) {
    if (typeof suggestion !== "string") return false;
  }

  for (const question of review.interviewQuestions) {
    if (typeof question !== "string") return false;
  }

  return true;
}

async function reviewCode(code) {
  const prompt = `
You are an expert Senior Software Engineer.

Analyze the following source code.

Return ONLY a valid JSON object.

The JSON structure MUST be:

{

     "title": "string",
     
  "summary": "string",

  "bugs": [
    {
      "severity": "LOW | MEDIUM | HIGH | CRITICAL",
      "category": "SYNTAX | LOGIC | SECURITY | PERFORMANCE | STYLE",
      "issue": "string",
      "explanation": "string",
      "correctCode": "only the code needed to fix THIS bug"
    }
  ],

  "suggestions": [
    "string",
    "string"
  ],

  "interviewQuestions": [
    "string",
    "string",
    "string"
  ],

  "fixedCode": "THE COMPLETE CORRECTED SOURCE CODE"
}

Rules:

1. Return ONLY JSON.
2. No markdown.
3. No \`\`\`.
4. Generate a short title.
5. Title should be maximum 5 words.
6. Title should describe the code.
7. Do NOT use quotes inside title.
8. Do NOT write "Code Review".
9. Examples:
   - React Login Form
   - JWT Authentication
   - Binary Search Tree
   - Mongoose Review Model

10. suggestions must be array of STRINGS.
11. interviewQuestions must be array of STRINGS.
12. bugs.correctCode should contain ONLY that bug's fix.
13. fixedCode must contain the COMPLETE corrected source code.
14. Never omit fixedCode.
15. If no bugs exist return bugs as [] but still return fixedCode.
Code:

${code}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  const review = JSON.parse(response);

  console.log(JSON.stringify(review, null, 2));

  if (!validateReview(review)) {
    throw new Error("Invalid AI response structure");
  }


  return review;
}

module.exports = {
  reviewCode,
};