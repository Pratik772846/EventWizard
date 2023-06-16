const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        // console.log(req.headers.authorization);
        console.log("inmiddleware");
        const token = req.headers.authorization.split(" ")[1];
        // const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        console.log("token done");
        console.log(decoded);
        req.userData = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'UnAuthorized.'
        });
    }  
};
