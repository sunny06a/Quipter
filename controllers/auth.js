import bcrypt from 'bcrypt'; // for password hashing
import jwt from 'jsonwebtoken'; // for token
import User from '../models/User.js';

// Register
export const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password,picturePath,friends,location,occupation} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "User already exist"});
        }
        const salt= await bcrypt.genSalt(); // generate salt
        const hashedPassword = await bcrypt.hash(password,salt); // hash password
        const newUser= await User.create({
            firstName, lastName, email, password: hashedPassword,picturePath,friends,location,occupation,viewedProfile:0,imperssions:0});
        res.status(200).json({newUser});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    } 
}

// Login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json({message: "User doesn't exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);  // compare password
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}