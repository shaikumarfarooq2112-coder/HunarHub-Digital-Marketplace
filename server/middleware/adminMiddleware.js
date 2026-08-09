const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {

    try {

        // Get logged-in user from authMiddleware
        const user = await User.findById(req.user.id);

        // Check whether user exists
        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // Check admin role
        if (user.role !== "admin") {

            return res.status(403).json({
                message: "Access denied. Admin only."
            });

        }

        // Continue
        next();

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};

module.exports = adminMiddleware;