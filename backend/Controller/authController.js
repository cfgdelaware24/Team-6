const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUserByUsername,
    findUserByEmail,
    updateUserPasswordByUsername,
    updateUserTopics,
    getUserById
} = require("../Model/authModel");

const register = async (req, res) => {
    const { username, email, password, securityAnswer } = req.body;

    try {
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const existingEmail = await findUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        if (!username || !email || !password || !securityAnswer) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const user = await createUser(username, email, password, securityAnswer);

        res.status(201).json({ message: "User registered successfully", userId: user.userID });
    } catch (error) {
        console.error("User register error:", error);
        res.status(500).json({ error: "User registration failed" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { userId: user.userID, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({ 
                token, 
                userId: user.userID, 
                hasCompletedTopics: user.hasCompletedTopics
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

const forgotPassword = async (req, res) => {
    const { username, newPassword, securityAnswer } = req.body;

    try {
        if (!username || !newPassword || !securityAnswer) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!(await bcrypt.compare(securityAnswer, user.securityAnswer))) {
            return res.status(400).json({ error: "Incorrect security answer" });
        }

        await updateUserPasswordByUsername(username, newPassword);

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ error: "Password reset failed" });
    }
};

const saveTopics = async (req, res) => {
    const { userId, topics } = req.body;

    try {
        const user = await updateUserTopics(userId, topics);
        res.status(200).json({ message: "Topics saved successfully", user });
    } catch (error) {
        console.error("Failed to save topics:", error);
        res.status(500).json({ error: "Failed to save topics" });
    }
};

const getTopics = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ topics: user.topics, hasCompletedTopics: user.hasCompletedTopics });
    } catch (error) {
        console.error("Failed to retrieve topics:", error);
        res.status(500).json({ error: "Failed to retrieve topics" });
    }
};

const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Failed to retrieve user:', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const getRiskAssessmentResult = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ riskAssessmentResult: user.riskAssessmentResult });
    } catch (error) {
      console.error('Failed to retrieve risk assessment result:', error);
      res.status(500).json({ error: 'Failed to retrieve risk assessment result' });
    }
  };

module.exports = { register, login, forgotPassword, saveTopics, getTopics, getUser, getRiskAssessmentResult };