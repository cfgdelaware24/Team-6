
const express = require("express");
const { getRiskAssessmentResult, register, login, forgotPassword, saveTopics, getTopics, getUser, getUserDetailsById } = require("../Controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/:userId", getUser);
router.get("/risk-assessment/:userId", getRiskAssessmentResult);
router.get("/details/:userId", getUserDetails)

module.exports = router;