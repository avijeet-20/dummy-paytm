const express = require('express');
const app = express();
const z = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');

const router = express.Router();


router.post('/signup', async (req,res) => {
   
    const credientials = req.body;

    const userSchema = z.object( {
        username: z.string().email(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
    } )

   

  const parsed =  userSchema.safeParse(credientials);
  console.log(parsed)
  const found = await User.find({username:req.body.username});
  console.log(found.length);

  if(parsed.success && found.length == 0){

    try{
        console.log("control reached")
        const user =  await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,});

            const userId = user._id;
           

            await Account.create({
                userId:userId,
                balance: 1 + Math.random()  * 10000,
            })
            
            const token = jwt.sign({
                userId
            },JWT_SECRET);

        res.status(200).json({
            message:"user created successfully",
            token:token
        })

        }catch(err){
                console.log(err);
              res.status(500).send("internal server error");
              

    }}else{

        res.status(411).json({
            message:"Email already taken/ Incorrect inputs"
        })
    }
     


})

router.post('/signin', async (req,res) => {
    const signinBody = z.object({
        username: z.string().email(),
        password: z.string()
    })
 
    console.log('control reached in signin')
    const credientials = req.body;
    console.log(credientials);

  const {success} =   signinBody.safeParse(credientials);

  if(!success){
    res.status(411).json({
        message:"incorrect inputs"
    })
  }
    
    const found = await User.findOne({username:req.body.username,
    password:req.body.password})

    console.log(found);
    console.log(found._id);

    if(found){
        const token = jwt.sign({userId:found._id},JWT_SECRET);
    
        res.status(200).json({
            token,
        });
    }else{
        res.status(411).json({
            message:"error while logging in"
        })
    }
   
})


router.put('/', authMiddleware, async (req,res) => {
    
    const update = req.body;
console.log(update);
    const updateSchema = z.object({
        password: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
    })


    const { success } = updateSchema.safeParse(update);

    if(!success) res.status(411).json({
        message:"invalid inputs"
    })

    try{
         await User.updateOne({_id:req.userId}, {$set:update} );
        res.status(200).json({
            message:"Updated  Successfully"
        })
    }catch(err){
        res.status(411).json({
            message:"error while udating"
        })
    }


})


router.get('/bulk', authMiddleware , async (req,res) => {
    
    const key = req.query.filter;
 
    console.log(key)


try{
    
  const userdata =  await User.find({
    $or:[{
        firstName:{
           '$regex':key,
        }
     },
     { 
        lastName:{
            '$regex':key  
        }
    }]
  }).select('firstName lastName _id username')
    
  console.log(userdata);

    res.status(200).send(userdata);

}catch(err){

    res.send("error in the system" + err);
        
}
})


module.exports = router