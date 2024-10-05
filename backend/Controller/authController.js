const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUserByUsername,
    findUserByEmail,
    updateUserPasswordByUsername,
    getUserById,
    getUserDetails
} = require("../Model/authModel");

const register = async (req, res) => {
    try {
        const { username, email, password, role, name, age, phone } = req.body;

        if (!username || !email || !password || !role || !name || !age || !phone) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await createUser(username, email, hashedPassword, role, name, age, phone);

        res.status(201).json({ message: 'User registered successfully', userId: newUser.user_id });
    } catch (error) {
        console.error('Registration error:', error.message, error.stack);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};





const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Correct password field name
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Correct user ID field name
        const token = jwt.sign(
            { userId: user.user_id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            token, 
            userId: user.user_id, 
            username: user.username,
            role: user.role // Ensure the role is returned here
        });
    } catch (error) {
        console.error("Login error:", error.message, error.stack);
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

  const getUserInformation = async (req, res) => {
    const { userId } = req.params;
    try {
        const userDetails = await getUserDetails(userId);
        if (!userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Failed to retrieve user details:', error);
        res.status(500).json({ error: 'Failed to retrieve user details' });
    }
};

module.exports = { register, login, forgotPassword, getUser, getRiskAssessmentResult, getUserInformation };