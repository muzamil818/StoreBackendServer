const User = require("../models/User").default
const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken")

//register
exports.registerUser = async (req, res) => {

    try{
        const {name, email, password, role} = req.body

        const existingEmail = await User.findOne({email});

        if(existingEmail) {
            return res.status(400).json({message: "User already exists "})
        }
        
        const user = await User.create({name, email ,password, role})
        res.status(201).json({message:"User registered successfully", user})
    
}catch(err){
    console.error("somthing went wrong api/user/register", err );
    
  res.status(500).json({ message: "Server error", err });
}
}

//login

exports.loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const isMatch =  await bycript.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"})
        }
        
        const token = jwt.sign(
            {id: user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(200).json(
            {message:"logged in",
                token,
              user:{
                email:  user.email,
                name:user.name,
                role:user.role            
                }
                  
            }
        )
        
    }catch(err){
        console.error(`something is wrong api/users/loginUser : ${err}`);
        
        res.status(500).json({ message: "Server error", err });
    }
}