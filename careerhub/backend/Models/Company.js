const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true
    },
    company_sector: {
        type: String,
        required: true,
    },
    company_total_num:{
        type: Number,
        required: true,
    },
    company_applied_num:{
        type: Number,
        required: true,
    },
    company_rejected_num:{
        type: Number,
        required: true,
    },
    company_oa_num:{
        type: Number,
        required: true,
    },
    company_interview_num:{
        type: Number,
        required: true,
    },
    company_final_num:{
        type: Number,
        required: true,
    },
    company_offer_num:{
        type: Number,
        required: true,
    },
    company_logo: {
        type: String,
        required: true,
    }},{
    timestamps: true
    })

module.exports = mongoose.model("Company", companySchema);