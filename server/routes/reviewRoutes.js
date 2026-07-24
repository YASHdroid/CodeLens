const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",  authMiddleware, reviewController.reviewCode);
router.get("/history", authMiddleware, reviewController.getReviewHistory);
router.delete("/:id", authMiddleware, reviewController.deleteReview);
router.get("/:id", authMiddleware, reviewController.getReviewById);
module.exports = router;