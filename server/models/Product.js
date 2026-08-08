const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    entrepreneur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entrepreneur",
        required: true
    },


    name: {
        type: String,
        required: true
    },


    category: {
        type: String,
        required: true
    },


    description: {
        type: String
    },


    price: {
        type: Number,
        required: true
    },


    image: {
        type: String
    },


    available: {
        type: Boolean,
        default: true
    }


}, {
    timestamps: true
});


module.exports = mongoose.model(
    "Product",
    productSchema
);