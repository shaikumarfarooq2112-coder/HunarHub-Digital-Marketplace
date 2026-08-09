const Entrepreneur = require("../models/Entrepreneur");
const Order = require("../models/Order");

// =====================================================
// CREATE ENTREPRENEUR PROFILE
// =====================================================

const createProfile = async (req, res) => {

    try {

        const {
            name,
            category,
            experience,
            location,
            skills,
            description
        } = req.body;


        const entrepreneur =
            await Entrepreneur.create({

                user: req.user.id,

                name,

                category,

                experience,

                location,

                skills,

                description

            });


        res.status(201).json({

            message:
                "Entrepreneur profile created successfully",

            entrepreneur

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL ENTREPRENEURS
// =====================================================

const getEntrepreneurs = async (req, res) => {

    try {

        const entrepreneurs =
            await Entrepreneur.find()
            .populate(
                "user",
                "name email"
            );


        res.status(200).json({

            entrepreneurs

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ENTREPRENEUR BY ID
// =====================================================

const getEntrepreneurById = async (req, res) => {

    try {

        const entrepreneur =
            await Entrepreneur.findById(
                req.params.id
            )
            .populate(
                "user",
                "name email"
            );


        if (!entrepreneur) {

            return res.status(404).json({

                message:
                    "Entrepreneur not found"

            });

        }


        res.status(200).json({

            entrepreneur

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
// UPDATE ENTREPRENEUR AVAILABILITY
// =====================================================

const updateAvailability = async (req, res) => {

    try {

        const entrepreneur =
            await Entrepreneur.findOne({

                user: req.user.id

            });


        if (!entrepreneur) {

            return res.status(404).json({

                message:
                    "Entrepreneur profile not found"

            });

        }


        entrepreneur.availability =
            req.body.availability;


        await entrepreneur.save();


        res.status(200).json({

            message:
                "Availability updated successfully",

            availability:
                entrepreneur.availability

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
// GET ENTREPRENEUR EARNINGS
// =====================================================

const getEarnings = async (req, res) => {

    try {

        // Find entrepreneur profile
        const entrepreneur =
            await Entrepreneur.findOne({
                user: req.user.id
            });


        if (!entrepreneur) {

            return res.status(404).json({

                message:
                    "Entrepreneur profile not found"

            });

        }


        // Get all orders belonging to entrepreneur
        const orders =
            await Order.find({
                entrepreneur: entrepreneur._id
            });


        // Total orders
        const totalOrders =
            orders.length;


        // Pending orders
        const pendingOrders =
            orders.filter(
                order =>
                    order.status === "Pending"
            ).length;


        // Confirmed orders
        const confirmedOrders =
            orders.filter(
                order =>
                    order.status === "Confirmed"
            ).length;


        // Completed orders
        const completedOrders =
            orders.filter(
                order =>
                    order.status === "Completed"
            ).length;


        // Cancelled orders
        const cancelledOrders =
            orders.filter(
                order =>
                    order.status === "Cancelled"
            ).length;


        // Calculate completed earnings
        const totalEarnings =
            orders
                .filter(
                    order =>
                        order.status === "Completed"
                )
                .reduce(
                    (total, order) =>
                        total + order.totalPrice,
                    0
                );


        // Calculate total sales
        const totalSales =
            orders
                .filter(
                    order =>
                        order.status !== "Cancelled"
                )
                .reduce(
                    (total, order) =>
                        total + order.totalPrice,
                    0
                );


        res.status(200).json({

            totalOrders,

            pendingOrders,

            confirmedOrders,

            completedOrders,

            cancelledOrders,

            totalEarnings,

            totalSales

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
// EXPORT CONTROLLERS
// =====================================================

module.exports = {

    createProfile,

    getEntrepreneurs,

    getEntrepreneurById,

    updateAvailability,

    getEarnings

};