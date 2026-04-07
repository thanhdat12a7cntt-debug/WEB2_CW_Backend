const isAdmin = (req, res, next) => {
    // req.user is set by the auth middleware after verifying the JWT token
    if (req.user && req.user.role === 'admin') {
                next();
            } else {
        return res.status(403).json({ message: "Access denied! You are not an admin." });
    }
};

export default isAdmin;