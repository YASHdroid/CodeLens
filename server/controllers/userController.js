const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ================= SIGNUP =================

async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to create user"
        });
    }
}


// ================= LOGIN =================

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Login failed"
        });
    }
}


// ================= CHANGE PASSWORD =================

async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        // Check fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                error: "Current password and new password are required"
            });
        }

        // Check new password length
        if (newPassword.length < 6) {
            return res.status(400).json({
                error: "New password must be at least 6 characters"
            });
        }

        // Find logged-in user
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Check old password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                error: "Current password is incorrect"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Save new password
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to change password"
        });
    }
}




module.exports = {
    signup,
    login,
    changePassword
};