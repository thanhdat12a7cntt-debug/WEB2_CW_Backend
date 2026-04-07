import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // Lấy token from Header 'Authorization: Bearer <token>'
    const authHeader = req.headers.token || req.headers.authorization;
    
    if (authHeader) {
        // Cắt bỏ chữ 'Bearer ' nếu có
        const token = authHeader.split(" ")[1] || authHeader;

        jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY', (err, user) => {
            if (err) return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
            
            
            req.user = user; 
            next(); 
        });
    } else {
        return res.status(401).json({ message: "Bạn chưa đăng nhập (Thiếu Token)!" });
    }
};

export default verifyToken;