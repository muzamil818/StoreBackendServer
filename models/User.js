import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcryptjs";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
    type:String,
    require: true,

    },

    role:{
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer"
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await genSalt(10)

    this.password = await  hash(this.password, salt)
    next()
})

export default model("User", userSchema)