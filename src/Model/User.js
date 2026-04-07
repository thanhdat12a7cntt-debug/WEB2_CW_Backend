import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true });

export default mongoose.model('User', userSchema);