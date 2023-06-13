const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

exports.handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.status(403).json({message:"forbidden request"}); //Forbidden 
    // evaluate jwt 
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
                expiresIn: "10s"
            });
            res.status(200).json({
                token: accessToken
            });
        }
    );
}