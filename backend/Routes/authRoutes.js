
const express = require("express");
const { getRiskAssessmentResult, register, login, forgotPassword, saveTopics, getTopics, getUser } = require("../Controller/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/save-topics", saveTopics);
router.get("/get-topics/:userId", getTopics);
router.get("/:userId", getUser);
router.get("/risk-assessment/:userId", getRiskAssessmentResult);

module.exports = router;