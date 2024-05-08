const { UserModel } = require('../models/user.model.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BlackListModel } = require('../models/blackList.model.js');
const saltRounds = 7;
const allUsers = async (req, res) => {
    try{
        const userData = await UserModel.find();
        res.status(200).json(userData);

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const userProfile =  async (req, res) => {
    try{
        const { id } = req.params;
        const isUser = await UserModel.findById(id);
        if(isUser){
            res.status(200).json({user : isUser});
        }else{
            res.status(404).json({message : 'User not found'})
        }

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const loginUser = async (req, res) => {
    try{
        const {username,password} = req.body
        const isUser = await UserModel.findOne({username:username});
        if(isUser){
           
             bcrypt.compare(password,isUser.password, (err, result) => {
                if(err){
                    return res.status(500).json({message : err})
                }else{
                    if(result){
                       
                        const accessToken = jwt.sign({id : isUser._id, role : isUser.role}, process.env.PRIVATE_KEY,{expiresIn :  '1h'})
                        const refreshToken = jwt.sign({id : isUser._id, role : isUser.role}, process.env.PRIVATE_KEY,{expiresIn : '1d'})
                        res.status(200).json({accessToken , refreshToken })
                    }else{
                        res.status(200).json({message : 'wrong password'})
                    }
                }
             })
        }else{
            res.status(200).json({message : 'wrong username'})
        }

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const registerUser = async (req, res) => {
    try{
        const {password} = req.body;
        bcrypt.hash(password,saltRounds, async(err, hash) => {
            if(err){
                return res.status(200).json({message : err.message})
            }else{
                const newUser = new UserModel({...req.body,password:hash})
                await newUser.save();
                res.status(200).json({message : 'user successfully registered'})
            }
        })

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const logoutUser = async (req, res) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const newToken = new BlackListModel({token});
        await newToken.save();
        res.status(200).json({message : 'user logout successfully'})

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const updateUser = async (req, res) => {
    try{
        const { id } = req.params;
        const isUser = await UserModel.findById(id);
        if(isUser) {
            await UserModel.findByIdAndUpdate(id,req.body);
            const updatedUser = await UserModel.findById(id);
            res.status(200).json(updatedUser)
        }else{
            res.status(200).json({message : 'User not found'})
        }
    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const deleteUser = async ( req,res) => {
    try{
        const { id } = req.params;
        const isUser = await UserModel.findById(id);
        if(isUser){
            await UserModel.findByIdAndDelete(id);
            res.status(200).json({message : "User deleted successfully"})
        }else{
            res.status(404).json({message : "User not found"})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    allUsers,
    userProfile,
    loginUser,
    logoutUser,
    deleteUser,
    registerUser,
    updateUser
}