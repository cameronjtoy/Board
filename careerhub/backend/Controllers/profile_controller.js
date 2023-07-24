const User = require('../Models/User')
const Company = require('../Models/Company')

const profileController = {
    viewAccount: async(req, res) => {
        try{
            const displayProducts = await Company.find()
            res.json(displayProducts)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }






}



