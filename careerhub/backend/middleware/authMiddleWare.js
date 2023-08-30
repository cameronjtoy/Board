const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createJWT = (req, res) => {
    const token = req.cookies.auth;
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: "Token is not valid" });
            } else {
                const user = await User.findOne({ username: decoded.username });
                if (!user) {
                    return res.status(401).json({ msg: "No such user" });
                }
                return res.status(200).json({ status: "success", user: user.username});
            }
            
        }
        );
    } catch (err) {
        console.error("something wrong with auth middleware");
        res.status(500).json({ msg: "Server Error" });
    }
};
