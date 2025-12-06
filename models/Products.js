import { Schema, model } from "mongoose"


const productSchema = Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
},{timestamps: true})

export default model("Product", productSchema)