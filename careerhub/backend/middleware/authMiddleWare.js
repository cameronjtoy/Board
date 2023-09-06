require("dotenv").config();
const jwt = require("jsonwebtoken");

const createJWT = async (req, res, next) => {
    const token = req.cookies.auth;
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: "No such user" });
        }
        req.user = decoded; 
        return next();

    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ msg: "Token is not valid" });
        }

        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = createJWT;
