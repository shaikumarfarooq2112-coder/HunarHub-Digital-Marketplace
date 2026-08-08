const express = require("express");

const router = express.Router();

const User = require("../models/User");

const {
    registerUser,
    loginUser
} = require("../controllers/userController");


const authMiddleware = require("../middleware/authMiddleware");


// Register Route

router.post(
    "/register",
    registerUser
);


// Login Route

router.post(
    "/login",
    loginUser
);


// ================= GET USER PROFILE =================

router.get(
    "/profile",
    authMiddleware,
    async (req, res) => {

        try {

            const user = await User.findById(
                req.user.id
            ).select("-password");


            res.status(200).json({

                user: user

            });


        } catch(error) {

            res.status(500).json({

                message: error.message

            });

        }

    }
);

module.exports = router;