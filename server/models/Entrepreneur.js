const mongoose = require("mongoose");


const entrepreneurSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    name: {
        type: String,
        required: true
    },


    category: {
        type: String,
        enum: [
            "Cobbler",
            "Potter",
            "Tailor",
            "Artisan",
            "Small Vendor"
        ],
        required: true
    },


    experience: {
        type: String
    },


    location: {
        type: String,
        required: true
    },


    skills: [
        {
            type: String
        }
    ],


    description: {
        type: String
    },


    verified: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
});


module.exports = mongoose.model(
    "Entrepreneur",
    entrepreneurSchema
);