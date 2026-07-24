const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signup(req, res) {

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

}

async function login(req ,res) {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    });
}

const isMatch = await bcrypt.compare(password, user.password);

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
    message: "Login Successful", token
});


    
}

module.exports = {
    signup , login
};