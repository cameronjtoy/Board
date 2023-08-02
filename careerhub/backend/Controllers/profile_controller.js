const User = require('../models/User')
const Company = require('../models/Company')
const CompanyUser = require('../models/User_Company_Relation')

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
    addCompanyRow: async(req, res) => {
        try{
            const { company_name, company_position, status, next_deadline, links  } = req.body;
            const cookie_dict = req.cookies;
            const current_cookie = cookie_dict.auth
            const current_user = await User.findOne({"cookie":current_cookie})
            if(!current_user || current_cookie == ""){
                res.redirect('localhost:3000/Login')
            }
            const current_company = await Company.findOne({"company_name":company_name})

            if(!current_company){
                const newCompany = new Company({
                    company_name: company_name, company_sector : "", company_location : "", company_website : "", company_description : "", company_logo : ""
                })
            }
            const current_company_user = await CompanyUser.findOne({"company_name":company_name, "username":current_user.username})
            if(current_company_user){
                current_status = current_company_user.status
                current_deadline = current_company_user.next_deadline
                if(current_status != status){
                    current_company.findOneAndUpdate({"company_name":company_name, "username":current_user.username}, {"status":status}, {new: true}, (err, doc) => {
                        if (err) {
                            console.log("Something wrong when updating data!");
                        }
                    });
                }
                else if(current_deadline != next_deadline){
                    current_company.findOneAndUpdate({"company_name":company_name, "username":current_user.username}, {"next_deadline":next_deadline}, {new: true}, (err, doc) => {
                        if (err) {
                            console.log("Something wrong when updating data!");
                        }
                    });
                }
                await current_company_user.save()
            }
            else{
                const newCompanyUser = new CompanyUser({
                    company_name: company_name, username: current_user.username, company_position: company_position, status: status, next_deadline: next_deadline, links: links
                })
                await newCompanyUser.save()
            }
            res.json({
                msg: "Company added successfully"
            });

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = profileController




