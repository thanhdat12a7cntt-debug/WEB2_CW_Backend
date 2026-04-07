import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';

// Route imports
import helproute from './route/helproute.js';
import authRoute from './route/auth.js'; 

// Middleware imports
import ratelimiter from './Middleware/ratelimiter.js';
import verifyToken from './Middleware/VerifyToken.js';
import HelpModel from './Model/HelpModel.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware cơ bản
app.use(cors());
app.use(express.json());

// Logger 
app.use((req, res, next) => {
    console.log(`🚀 ${req.method}: ${req.url} - ${new Date().toLocaleString()}`);
    next();
});


app.use('/api/auth', authRoute);


app.use('/api/help', ratelimiter, verifyToken, helproute);


app.get('/api/search', ratelimiter, async (req, res) => {
    const query = req.query.q; 
    if (!query) return res.json([]);

    try {
        const results = await HelpModel.find({
            $or: [
                { Key: { $regex: query, $options: 'i' } },
                { Category: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(results); 
    } catch (err) {
        res.status(500).json({ message: "Lỗi tìm kiếm" });
    }
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on Port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Database connection failed:', err);
});