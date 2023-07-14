const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:true
    },
    cookie:{
        type:String,
        require:true
    },
    resume:{
        type:String,
        require:true
    },
    projects:{
        type:String,
        require:true
    }
    },{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)