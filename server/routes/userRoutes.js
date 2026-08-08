const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



router.post("/signup", userController.signup);
router.post("/login", userController.login);



router.put(
    "/change-password",
    authMiddleware,
    userController.changePassword
);


module.exports = router;