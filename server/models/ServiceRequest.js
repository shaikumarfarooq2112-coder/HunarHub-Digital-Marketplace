const mongoose = require("mongoose");


// ================= SERVICE REQUEST MODEL =================

const serviceRequestSchema = new mongoose.Schema(

    {

        // Customer who requested service
        customer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Entrepreneur receiving request
        entrepreneur: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Entrepreneur",

            required: true

        },


        // Service required
        service: {

            type: String,

            required: true

        },


        // Customer description
        description: {

            type: String,

            required: true

        },


        // Requested date
        date: {

            type: Date,

            required: true

        },


        // Request status
        status: {

            type: String,

            enum: [
                "Pending",
                "Accepted",
                "Rejected"
            ],

            default: "Pending"

        }


    },

    {
        timestamps: true
    }

);


module.exports = mongoose.model(
    "ServiceRequest",
    serviceRequestSchema
);