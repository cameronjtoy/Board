require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createJWT = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
