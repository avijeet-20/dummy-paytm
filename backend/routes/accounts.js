const express = require('express');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const authMiddleware = require('../middleware');

const router = express.Router();

router.get('/balance',authMiddleware, async (req,res) => {
    
    const account = await Account.findOne({
        userId:req.userId
    })


    res.status(200).json({
        balance:account.balance
    })


})

router.post('/transfer',authMiddleware, async (req,res) => { 

    const {to ,amount } = req.body;

    const session = await mongoose.startSession();

    session.startTransaction();

    const sender = await Account.findOne({userId:req.userId}).session(session);

    if(!sender || sender.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message:"insufficient funds/user not found"
        })


    }


    const reciever = await Account.findOne({userId:to}).session(session);

    if(!reciever){
        await session.abortTransaction();
        res.status(400).json({
            message:"user not found"
        })


    }
    await Account.updateOne({userId:req.userId},{$inc:{
       balance:-amount
    }}).session(session);

    await Account.updateOne({userId:to},{$inc:{
       balance:amount
    }}).session(session);


     await session.commitTransaction();

  
    res.status(200).json({
    message:"transaction successfull"
  })

    session.endSession();
  

})



 


module.exports = router;