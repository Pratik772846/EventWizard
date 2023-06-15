const User = require('../models/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res,next)=>{
    const users = await User.find({email:req.body.email});
    if(users.length>=1){
        res.status(409).json({
           message: 'This Mail already exists.'
        });
    }
    else{
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error: err,
                    message:"Error while encrypting password.Signup again."
                });
            }
            else{
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    name: req.body.name,
                    image: req.body.image,
                    contact_number: req.body.contact_number,
                    friends:req.body.friends,
                    refreshToken:req.body.refreshToken
                })
                user.save().then(result=>{
                    console.log(result);
                    res.status(201).json({
                        message: 'User successfully created.YOu can Login now.'
                    });
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({
                        error: err,
                        message: 'Internal Server Error. Retry again .'
                    });
                })
             };
    
            }); 
    }
};

exports.login = async(req,res,next)=>{

    const { email, password } = req.body;

    const foundUser = await User.findOne({email:email }).exec();
    if (!foundUser) return res.status(401).json({message:"UnAuthorized"}); 

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const accessToken =jwt.sign({
            email: foundUser.email,
            userId: foundUser._id
        },
        process.env.JWT_KEY,
        {
            expiresIn: "50s"
        });

        const refreshToken = jwt.sign(
            { email: foundUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        
        return res.status(200).json({
            message: 'Auth successful',
            accessToken: accessToken,
            refreshToken: refreshToken,
            id: foundUser._id
        });
    }
    else{
        res.status(401).json({message:"Auth Failed"});
    }
}


exports.delete_account =(req,res,next)=>{
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'User successfully deleted'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err,
            message: 'Internal Server Error. Retry again .'
        });
    });
}

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedFields = req.body;
    
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updatedFields }, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        return res.json({
            user_details:updatedUser,
            message: 'User updated successfully'
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message : 'Internal Server Error' });
      }
}

exports.allUsersProfile = async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1 });
    
        return res.json({ users });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
}

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
    
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        return res.json({ user });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred' });
      }
}

