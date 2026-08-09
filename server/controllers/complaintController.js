const Complaint =
    require("../models/Complaint");


// =====================================================
// CREATE COMPLAINT
// =====================================================

const createComplaint =
    async (req, res) => {

        try {

            const {
                entrepreneur,
                order,
                subject,
                description
            } = req.body;


            const complaint =
                await Complaint.create({

                    customer:
                        req.user.id,

                    entrepreneur,

                    order,

                    subject,

                    description

                });


            res.status(201).json({

                message:
                    "Complaint submitted successfully",

                complaint

            });

        }
        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message

            });

        }

    };


// =====================================================
// GET CUSTOMER COMPLAINTS
// =====================================================

const getCustomerComplaints =
    async (req, res) => {

        try {

            const complaints =
                await Complaint.find({

                    customer:
                        req.user.id

                })
                .populate(
                    "entrepreneur",
                    "name category location"
                )
                .populate(
                    "order",
                    "totalPrice status"
                )
                .sort({
                    createdAt: -1
                });


            res.status(200).json({

                complaints

            });

        }
        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message

            });

        }

    };


// =====================================================
// GET ALL COMPLAINTS - ADMIN
// =====================================================

const getAllComplaints =
    async (req, res) => {

        try {

            const complaints =
                await Complaint.find()
                .populate(
                    "customer",
                    "name email"
                )
                .populate(
                    "entrepreneur",
                    "name category"
                )
                .populate(
                    "order",
                    "totalPrice status"
                )
                .sort({
                    createdAt: -1
                });


            res.status(200).json({

                complaints

            });

        }
        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message

            });

        }

    };


// =====================================================
// UPDATE COMPLAINT - ADMIN
// =====================================================

const updateComplaint =
    async (req, res) => {

        try {

            const {
                status,
                adminResponse
            } = req.body;


            const complaint =
                await Complaint.findByIdAndUpdate(

                    req.params.id,

                    {

                        status,

                        adminResponse

                    },

                    {

                        new: true

                    }

                );


            if (!complaint) {

                return res.status(404).json({

                    message:
                        "Complaint not found"

                });

            }


            res.status(200).json({

                message:
                    "Complaint updated successfully",

                complaint

            });

        }
        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    error.message

            });

        }

    };


module.exports = {

    createComplaint,

    getCustomerComplaints,

    getAllComplaints,

    updateComplaint

};