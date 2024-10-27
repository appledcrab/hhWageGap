const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Company name required"]
        },
        wg_certified:{
            type:Boolean,
            required:true
        },
        industry:{
            type:String,
            enum:["Business","Resturants","Information Technology","Insurance","Health Care","Education","Computer Hardware Development","Accounting","Internet and Web Services","Other"]
        },
        description:{
            type:String
        },
        rating:{
            type:Number
        },
        reviews:{
            type:Number
        }
    },
    {
        timestamps:true
    }
)

const Company = mongoose.model("Company",CompanySchema);
module.exports = Company