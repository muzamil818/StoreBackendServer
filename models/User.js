const mongoose = require("mongoose")
const bycript = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        unique: true,
        required: true    
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    },
    
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bycript.getSalt(10)

    this.password = await  bycript.hash(this.password, salt)
    next()
})

module.exports = mongoose.model("User", userSchema)