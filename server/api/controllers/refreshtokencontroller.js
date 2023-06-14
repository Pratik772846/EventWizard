const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

exports.handleRefreshToken = async (req, res) => {

    const refreshToken = req?.body?.refreshToken;
    console.log(refreshToken);
    if(!refreshToken) return res.status(401).json({message:"UnAuthorozed"});
    
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.status(403).json({message:"forbidden request"}); //Forbidden 
    jwt.verify(
        refreshToken,
        process.env.JWT_KEY,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.status(403).json("Not Authorized");
            
            const accessToken =jwt.sign({
                email: decoded.email,
                userId:decoded._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "50s"
            });

            res.status(200).json({
                token: accessToken
            });
        }
    );
}