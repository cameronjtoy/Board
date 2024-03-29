const User = require('../models/User')
const Company = require('../models/Company')
const CompanyUser = require('../models/User_Company_Relation')
const authMiddleWare = require('../middleware/authMiddleWare')

const profileController = {
    viewAccount: async(req, res) => {
        try {
            const current_username = req.user;
            const user_info = await User.findOne({ username: current_username.username });

            // Fetching all companies added by current user
            const userCompanies = await CompanyUser.find({ username: current_username.username });
            // Send the user's companies

            return res.json({ // Return here as well to ensure no further code is executed
                userCompanies
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message }); // Return here to ensure no further code is executed
        }
    },

    addCompanyRow: async(req, res) => {
        try{
            const { company_name, company_position, status, next_deadline, links  } = req.body;
            const current_username = req.user;

            // if(!current_user || current_cookie == ""){
            //     return res.redirect('localhost:3000/login')
            // }
            // const current_company = await Company.findOne({"company_name":company_name})

            // if(!current_company){
            //     const newCompany = new Company({
            //         company_name: company_name, company_sector : "", company_location : "", company_website : "", company_description : "", company_logo : ""
            //     })
            //     await newCompany.save()
            // }

            const current_company_user = await CompanyUser.findOne({"company_name":company_name, "username":current_username.username})

            if(current_company_user){
                current_status = current_company_user.status
                current_deadline = current_company_user.next_deadline
                if(current_status != status){
                    current_company_user.findOneAndUpdate({"company_name":company_name, "username":current_username.username}, {"status":status}, {new: true}, (err, doc) => {
                        if (err) {
                            console.log("Something wrong when updating data!");
                        }
                    });
                }
                else if(current_deadline != next_deadline){
                    current_company_user.findOneAndUpdate({"company_name":company_name, "username":current_username.username}, {"next_deadline":next_deadline}, {new: true}, (err, doc) => {
                        if (err) {
                            console.log("Something wrong when updating data!");
                        }
                    });
                }
                await current_company_user.save()
            }
            else{
                const newCompanyUser = new CompanyUser({
                    company_name: company_name, username: current_username.username, company_position: company_position, status: status, next_deadline: next_deadline, links: links
                })
                await newCompanyUser.save()
            }
            res.json({
                msg: "Company added successfully"
            });

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateCompanyRow : async(req, res) => {
        try {
            const payload = req.body;
            const current_username = req.user;
            const columnID = payload.columnId;
        
            const filter = {
                "company_name": payload.companyName,
                "username": current_username.username
            };
        
            const update = {
                [columnID]: payload.updatedValue
            };
        
            const current_company = await CompanyUser.findOneAndUpdate(filter, update, {
                new: true
            });
        
            if (!current_company) {
                throw new Error('Failed to update company information.');
            }
        
            // If you need to save the changes (though it's typically not needed with findOneAndUpdate)
            // await current_company.save();
        
            res.json({
                msg: "Company updated successfully"
            });
        
        } catch (err) {
            res.status(500).send("Internal server error");
        }
        
    }
}

module.exports = profileController




