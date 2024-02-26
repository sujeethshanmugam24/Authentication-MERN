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

export const google=async(req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:Hashedpassword,...rest}=user._doc;
            const expirydate=new Date(Date.now()+3600000);
            res.cookie('access_token',token,{httpOnly:true,expires:expirydate}).status(200).json(rest);
        }
        else{
            const generatedpassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedpassword=bcryptjs.hashSync(generatedpassword,10)
            const newuser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),email:req.body.email,password:hashedpassword,profilepicture:req.body.photo});
            await newuser.save();
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password:hashedpassword2,...rest}=user._doc;
            const expirydate=new Date(Date.now()+3600000);
            res.cookie('access_token',token,{httpOnly:true,expires:expirydate}).status(200).json(rest);
             
        }
        
    } catch (error) {
        next(error);
    }
}
