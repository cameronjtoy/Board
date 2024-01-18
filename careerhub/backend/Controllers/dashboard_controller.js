const User = require('../models/User')
const Company = require('../models/Company')
const User_Company = require('../models/User_Company_Relation')

const dashboardController = {
        getCompanies: async(req, res) => {
            try{
                const companies = await User_Company.aggregate([
                    {
                        $group: {
                            _id: '$company_name',
                            total: { $sum: 1 },
                            inteviewed: { $sum: { $cond: [ { $eq: [ "$status", "Interview" ] }, 1, 0 ] } },
                            offer: { $sum: { $cond: [ { $eq: [ "$status", "Offer" ] }, 1, 0 ] } },
                            rejected: { $sum: { $cond: [ { $eq: [ "$status", "Rejected" ] }, 1, 0 ] } },
                            pending: { $sum: { $cond: [ { $eq: [ "$status", "Pending" ] }, 1, 0 ] } },
                            applied: { $sum: { $cond: [ { $eq: [ "$status", "Applied" ] }, 1, 0 ] } },
                        }
                    }
                ]);
                res.json(companies)
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