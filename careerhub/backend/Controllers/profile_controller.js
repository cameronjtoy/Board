const User = require('../models/User')
const Company = require('../models/Company')
const CompanyUser = require('../models/User_Company')

const profileController = {
    viewAccount: async(req, res) => {
        try{
            const cookie_dict = req.cookies;
            const current_cookie = cookie_dict.auth
            const current_user = await User.findOne({"cookie":current_cookie})
            if(!current_user || current_cookie == ""){
                res.redirect('localhost:3000/Login')
            }

            // Fetching all companies added by current user
            const userCompanies = await User.find({ username: current_user.username }).populate('company_name')

            // Extract companies from the populated user-company relations
            const companiesForUser = userCompanies.map(relation => relation.company_name);
            
            // Send the user's companies
            res.json({
                userCompanies: companiesForUser
            });
        }catch(err){
            return res.status(500).json({msg: err.message})
        }

    },
    updateRow: async(req, res) => {
        try{
            const { company_name, compa } = req.body;
            const cookie_dict = req.cookies;
            const current_cookie = cookie_dict.auth
            const user = await User.findOne({"cookie":current_cookie})
            if(!user || current_cookie == ""){
                res.redirect('localhost:3000/Login')
            }

            res.json({
                userCompanies: companiesForUser
            });

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}



