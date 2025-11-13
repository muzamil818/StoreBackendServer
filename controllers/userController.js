const User = require("../models/User")
const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken")

//register
exports.registerUser = async (req, res) => {

    try{
        const {name, email, password, role} = req.body

        const existingEmail =await User.findOne(email);

        if(existingEmail) {
            return res.status(400).json({message: "User already exists "})
        }
        
        const user = await User.create({name, email ,password, role})
        res.status(201).json({message:"User registered successfully", user})
    
}catch(err){
  res.status(500).json({ message: "Server error", err });
}
}

//login

