const User = require('../Models/User')
const Company = require('../Models/Company')

const dashboardController = {
        getCompanies: async(req, res) => {
            try{
                const displayProducts = await Company.find()
                res.json(displayProducts)
            }catch(err){
                return res.status(500).json({msg: err.message})
            }
        },

        addCompanies : async(req, res) => {
            try{
                const {company_name, company_id, company_sector, company_total_num, company_applied_num, company_rejected_num, company_oa_num, company_interview_num, company_final_num, company_offer_num, company_logo} = req.body;
                const newCompany = new Company({
                    company_name, company_id, company_sector, company_total_num, company_applied_num, company_rejected_num, company_oa_num, company_interview_num, company_final_num, company_offer_num, company_logo
                })
                await newCompany.save()
                res.json({msg: "Added a new company"})
            }
            catch(err){
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