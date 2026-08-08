const mongoose = require("mongoose");


// ================= ORDER MODEL =================

const orderSchema = new mongoose.Schema(

    {

        // Customer who placed order
        customer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Product purchased
        product: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Product",

            required: true

        },


        // Product owner
        entrepreneur: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Entrepreneur",

            required: true

        },


        // Number of products
        quantity: {

            type: Number,

            required: true,

            default: 1

        },


        // Total amount

        totalPrice: {

            type: Number,

            required: true

        },


        // Order status

        status: {

            type: String,

            enum: [
                "Pending",
                "Confirmed",
                "Completed",
                "Cancelled"
            ],

            default: "Pending"

        }


    },

    {
        timestamps: true
    }

);


module.exports = mongoose.model(
    "Order",
    orderSchema
);