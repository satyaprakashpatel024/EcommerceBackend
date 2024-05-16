const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    userid:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase :true,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        default:'CUSTOMER',
        enum:['ADMIN','CUSTOMER']
    }
},{
    timestamps:true,
    versionKey:false
});

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;