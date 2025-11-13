const mongoose = require("mongoose")
const { applyTimestamps } = require("./User")

const productSchema = mongoose.Schema({
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

module.exports = mongoose.model("Product", productSchema)