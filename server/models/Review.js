const mongoose = require("mongoose");


// ================= REVIEW MODEL =================

const reviewSchema = new mongoose.Schema(

    {

        // Customer who gave review
        customer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Product being reviewed
        product: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Product",

            required: true

        },


        // Entrepreneur who owns product
        entrepreneur: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Entrepreneur",

            required: true

        },


        // Rating from 1 to 5 stars
        rating: {

            type: Number,

            required: true,

            min: 1,

            max: 5

        },


        // Customer feedback text
        comment: {

            type: String,

            required: true

        }


    },

    {

        timestamps: true

    }

);


module.exports = mongoose.model(
    "Review",
    reviewSchema
);