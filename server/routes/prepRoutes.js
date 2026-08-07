const express = require("express");
const prepController = require("../controllers/prepController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/" , authMiddleware , prepController.generateInterview);
router.get(
  "/history",
  authMiddleware,
  prepController.getInterviewHistory
);

router.get(
  "/:id",
  authMiddleware,
  prepController.getInterviewById
);

router.delete(
  "/:id",
  authMiddleware,
  prepController.deleteInterview
);
module.exports = router;