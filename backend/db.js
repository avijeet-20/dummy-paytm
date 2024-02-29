const mongoose = require('mongoose');
const { Schema } = require('zod');

mongoose.connect("mongodb+srv://avipandey20:Avijeet%40123@cluster0.rxowycg.mongodb.net/paytm");


const signupSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        require:true,
        minLength:6,
        type:String
    },
    firstName:{
        require:true,
        maxLength:50,
        type:String,
        trim:true
    },
    lastName:{
        require:true,
        maxLength:50,
        type:String,
        trim:true
    },
})

const accountsSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId ,
    ref:"User",
    required:true  
},
balance:{
    type:Number,
    required:true
}
})

const User = mongoose.model('Users', signupSchema );
const Account = mongoose.model('Accounts', accountsSchema);

module.exports =  {
    User,
    Account
}