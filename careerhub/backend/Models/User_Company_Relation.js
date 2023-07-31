const  mongoose = require('mongoose');

const userCompanyRelationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    company_name: {
        type: String,
        required: true,
        },
    }
    ,{
    timestamps: true
    })


module.exports = mongoose.model("User_Company_Relation", userCompanyRelationSchema);
