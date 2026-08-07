const prepService = require("../services/prepService");
const Interview = require("../models/Interview");
async function generateInterview(req, res) {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({
      error: "Code is required",
    });
  }

  try {
  const interview = await prepService.generateInterview(
    code,
    language
  );

  const savedInterview = await Interview.create({
    title: interview.title,
    language: language || "JavaScript",
    code,
    interview,
    userId: req.user.id,
  });

  return res.status(201).json(savedInterview);

} catch (error) {
  console.error(error);

  return res.status(500).json({
    error: "Failed to generate interview questions",
  });
}
}

async function getInterviewHistory(req, res) {
  try {
    const interviews = await Interview.find({
      userId: req.user.id,
    })
      .select("_id title language createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json(interviews);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch interview history",
    });
  }
}

async function getInterviewById(req, res) {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        error: "Interview not found",
      });
    }

    return res.status(200).json(interview);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch interview",
    });
  }
}

async function deleteInterview(req, res) {
  try {
    const interview = await Interview.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        error: "Interview not found",
      });
    }

    return res.status(200).json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to delete interview",
    });
  }
}

module.exports = {
  generateInterview,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
};