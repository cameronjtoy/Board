const Users = require('../models/User')
const Company = require('../models/Company')
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const { tokenGenerator } = require('../utils/SecretToken')

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
            const token = tokenGenerator(username);
            res.cookie('auth', token, {httpOnly: false, withCredentials: true})
            const newUser = new Users({
                username, email, password: passwordHash, university:"", resume: "", projects: ""
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
            const token = tokenGenerator(username);
            res.cookie('auth', token, {httpOnly: false, withCredentials: true})
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
                res.redirect('http://localhost:3000/login')
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
                res.redirect('http://localhost:3000/login')
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