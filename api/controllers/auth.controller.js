import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';



export const signup=async(req,res,next)=>{
    const{username,email,password}=req.body; 
    const Hashedpassword=bcryptjs.hashSync(password,10);
    const newuser=new User({username,email,password:Hashedpassword});
    try {
        await newuser.save()
        res.status(201).json({message:"user created succesfully"})
    } catch (error) {
        next(error)
    }
};   


export const signin=async(req,res,next)=>{
    const{email,password}=req.body;
    try{
        const validuser=await User.findOne({email});
        if(!validuser) return next(errorhandler(404,'User not found'));
        const validpassword=bcryptjs.compareSync(password,validuser.password);
        if(!validpassword) return next(errorhandler(401,'wrong credentials'));
        const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET);
        const{password:Hashedpassword,...rest}=validuser._doc;
        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest);
    }catch(err){
        next(err);
    }
};
