require("dotenv").config();

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",

  generationConfig: {
    responseMimeType: "application/json",

    responseSchema: {
      type: "object",

      properties: {
        bugs: {
          type: "array",

          items: {
            type: "object",

            properties: {
              severity: {
                type: "string",
                enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
              },

              category: {
                type: "string",
                enum: [
                  "SYNTAX",
                  "LOGIC",
                  "SECURITY",
                  "PERFORMANCE",
                  "STYLE",
                ],
              },

              issue: {
                type: "string",
              },

              explanation: {
                type: "string",
              },

              correctCode: {
                type: "string",
              },
            },

            required: [
              "severity",
              "category",
              "issue",
              "explanation",
              "correctCode",
            ],
          },
        },
      },

      required: ["bugs"],
    },
  },
});

function validateReview(review) {
  if (!review) {
    return false;
  }

  if (!Array.isArray(review.bugs)) {
    return false;
  }

  for (const bug of review.bugs) {
    if (typeof bug.severity !== "string") {
      return false;
    }

    if (typeof bug.category !== "string") {
      return false;
    }

    if (typeof bug.issue !== "string") {
      return false;
    }

    if (typeof bug.explanation !== "string") {
      return false;
    }

    if (typeof bug.correctCode !== "string") {
      return false;
    }
  }

  return true;
}

async function reviewCode(code) {
  const prompt = `
Analyze the provided code and identify bugs or problems.

For every problem:

- Classify its severity.
- Classify its category.
- Explain the issue in simple language.
- Provide corrected code for that specific issue.

Severity rules:

LOW = minor code quality issue
MEDIUM = issue that causes problems in specific cases
HIGH = major bug or code-breaking issue
CRITICAL = serious security or production risk

Code:

${code}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();
  const review = JSON.parse(response);



  const isValid = validateReview(review);

if (!isValid) {
  throw new Error("Invalid AI response structure");
}

return review;
}

module.exports = {reviewCode
};