const mongoose = require("mongoose");

// ================= COMPLAINT MODEL =================

const complaintSchema = new mongoose.Schema(

    {

        // Customer who submitted complaint
        customer: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Optional entrepreneur involved
        entrepreneur: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Entrepreneur"

        },


        // Optional order related to complaint
        order: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Order"

        },


        // Complaint subject
        subject: {

            type: String,

            required: true

        },


        // Complaint description
        description: {

            type: String,

            required: true

        },


        // Complaint status
        status: {

            type: String,

            enum: [
                "Pending",
                "Under Review",
                "Resolved",
                "Rejected"
            ],

            default: "Pending"

        },


        // Admin response
        adminResponse: {

            type: String,

            default: ""

        }

    },

    {

        timestamps: true

    }

);


// Export model

module.exports =
    mongoose.model(
        "Complaint",
        complaintSchema
    );