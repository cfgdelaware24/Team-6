const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUserByUsername,
    findUserByEmail,
    updateUserPasswordByUsername,
    getUserById
} = require("../Model/authModel");

const register = async (req, res) => {
    try {
        console.log('Registration attempt:', req.body);
        const { username, email, password } = req.body;

        // Check if username or email already exists
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const existingEmail = await findUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Create new user with hashed password
        const newUser = await createUser(username, email, password);

        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
        console.error('Registration error:', error.message, error.stack);
        res.status(500).json({ error: "An error occurred during registration" });
    }
};


  const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await findUserByUsername(username);

        if (!user) {
            console.error('User not found:', username);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Ensure that the user object has a password_hash property
        if (!user.password_hash) {
            console.error('Password hash missing for user:', username);
            return res.status(500).json({ error: "User data is invalid" });
        }

        // Compare provided password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            console.error('Incorrect password for user:', username);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate the JWT token
        const token = jwt.sign(
            { userId: user.userID, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            userId: user.userID,
            hasCompletedTopics: user.hasCompletedTopics,
        });
    } catch (error) {
        console.error('Login error:', error.message, error.stack);
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

module.exports = { register, login, forgotPassword, getUser, getRiskAssessmentResult };