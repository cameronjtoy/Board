const  mongoose = require('mongoose');

const userCompanyRelationSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true
    },
    company_id: {
        type: String,
        required: true,
        },
    }
    ,{
    timestamps: true
    })


module.exports = mongoose.model("User_Company_Relation", userCompanyRelationSchema);
