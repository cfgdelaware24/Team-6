
const express = require("express");
const { getRiskAssessmentResult, register, login, forgotPassword, getUser, getUserInformation } = require("../Controller/authController");
const router = express.Router();

router.post('/register', register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/:userId", getUser);
router.get("/risk-assessment/:userId", getRiskAssessmentResult);
router.get("/details/:userId", getUserInformation)

module.exports = router;