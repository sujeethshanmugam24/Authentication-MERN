import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const signup=async(req,res)=>{
    const{username,email,password}=req.body; 
    const Hashedpassword=bcryptjs.hashSync(password,10);
    const newuser=new User({username,email,password:Hashedpassword});
    try {
        await newuser.save()
        res.status(201).json({message:"user created succesfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}; 