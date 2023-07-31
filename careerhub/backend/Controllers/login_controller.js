const Users = require('../models/User')
const Company = require('../models/Company')
const bcrypt = require('bcrypt')
const crypto = require("crypto");

const loginController = {
    //Register Request
    register: async (req, res) =>{
        try {
            const {username, password, email} = req.body;
            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg: "The email already exists."})
            const user_username = await Users.findOne({username})
            if(user_username) return res.status(400).json({msg: "This username already exists."})
            if(password.length < 6) return res.status(400).json({msg: "Password is at least 6 characters long."})
            const passwordHash = await bcrypt.hash(password, 10)
            const cookie_value = crypto.randomBytes(20).toString('hex');
            const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            res.cookie('auth', cookie_value, {httpOnly: false, expires: expirationDate});
            
            const newUser = new Users({
                username, email, password: passwordHash, cookie:cookie_value, university:"", resume: "", projects: ""
            })
            await newUser.save()
            res.json({msg : "Account Successfully Created"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //Login Request 
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await Users.findOne({ username });
            if (!user) {
                return res.status(400).json({msg: "User does not exist."});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
            const cookie_value = crypto.randomBytes(20).toString("hex");
            const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const filter = { username: username };
            const update = { cookie: cookie_value };
            const updatedUser = await Users.findOneAndUpdate(filter, update);
            await updatedUser.save();
        
            res.cookie('auth', cookie_value, {httpOnly: false, expires: expirationDate})
            res.json({msg: "You are now logged in"})
            } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    logout: async (req, res) => {
        try {
            const cookie_dict = req.cookies;
            const current_cookie = cookie_dict.auth
            if(!current_cookie){
                res.redirect('localhost:3000/Login')
                return res.json({msg:"You are not Logged In"})
            }
            const filter = { username : user.username };
            const update = { cookie : "" };
            return res.clearCookie('auth', {httpOnly: true}).redirect('localhost:3000/').json({msg: "Logged out"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    viewAccount: async(req, res) => {
        try {
            const cookie_dict = req.cookies;
            const current_cookie = cookie_dict.auth

            const user = await Users.findOne({"cookie":current_cookie})
            if(!user || current_cookie == ""){
                res.redirect('localhost:3000/Login')
            }
            else{
                return res.json(user)
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = loginController