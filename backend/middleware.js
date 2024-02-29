const JWT_SECRET = require("./config");
const jwt = require('jsonwebtoken');

function authMiddleware(req,res,next){

    const header = req.headers.authorization;
 
    console.log(req.params.filter);

    if(!header || !header.startsWith('Bearer ')){
       return  res.status(403).send();
    }

    const token = header.split(" ")[1];




    const verified = jwt.verify(token, JWT_SECRET);


    if(verified){

        req.userId = verified.userId;
        next();

    }else{
        res.status(403).send("forbidden");
    }

   
}


module.exports = authMiddleware;