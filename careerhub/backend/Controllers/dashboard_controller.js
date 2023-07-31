const User = require('../models/User')
const Company = require('../models/Company')

const dashboardController = {
        getCompanies: async(req, res) => {
            try{
                const displayProducts = await Company.find()
                res.json(displayProducts)
            }catch(err){
                return res.status(500).json({msg: err.message})
            }
        },
        removeCompanies : async(req, res) => {
            try{

            }
            catch(err){
                return res.status(500).json({msg: err.message})
            }

        }   
    }


module.exports = dashboardController