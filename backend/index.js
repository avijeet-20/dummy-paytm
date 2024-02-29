const express = require("express");
const {  User } = require("./db");
const rootRouter = require('./routes/index');
const cors = require('cors');
const app = express();
const JWT_SECRET = require('./config');
app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);







// app.get('/signup', async (req,res) => {
//     const credientials = req.body;

//    try{
//    const signingin =  await signup.create(credientials);
//    res.send("User logged in  Successfully");
//    }catch(err){
//          res.status(500).send("internal server error");
//    }

   
// })


app.listen(3000, () => {
    console.log("listening on port")
});




