import User from '../Model/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {
    try {
        const { Username, Password, role } = req.body;
        
        // check if username already exists
        const userExists = await User.findOne({ Username });
        if (userExists) return res.status(400).json({ message: "Username already exists!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        
        const newUser = new User({ 
            Username, 
            Password: hashedPassword, 
            role: role || 'user' 
        });

        await newUser.save();
        res.status(201).json({ message: "Register successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const user = await User.findOne({ Username });
        if (!user) return res.status(404).json({ message: "Account does not exist!" });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password!" });

        // Tạo Token 
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'SECRET_KEY', 
            { expiresIn: '1d' }
        );

        // return token and user information for Frontend to store in localStorage
        res.json({ 
            token, 
            username: user.Username, 
            role: user.role 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};