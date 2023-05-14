const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signup = async (req,res)=>{
    // Existing User Check
    // Hash Password Generate
    // Creating User
    // Token Generate

    const {username,email,password} = req.body;
    try{
        const isExistingUser = await userModel.findOne({email});
        if(isExistingUser){
            return res.status(400).json({error:"User Already Exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const result = await userModel.create({
            username:username,
            email:email,
            password:hashedPassword
        })

        const token = jwt.sign({email:result.email,id:result._id},process.env.SECRET_KEY);
        res.status(201).json({user:result,token:token});
        console.log("Success Added")
    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const isExistingUser = await userModel.findOne({email});
        if(!isExistingUser){
            return res.status(400).json({error:"User Doesn't Exists"});
        }

        const matchPassword = await bcrypt.compare(password,isExistingUser.password);

        if(!matchPassword){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        const token = jwt.sign({email:isExistingUser.email,id:isExistingUser._id},process.env.SECRET_KEY);
        res.status(200).json({user:isExistingUser,token:token});

    }catch(error){
        console.log(error)
        res.status(500).json({error:error})
    }
}

module.exports={signup,login}