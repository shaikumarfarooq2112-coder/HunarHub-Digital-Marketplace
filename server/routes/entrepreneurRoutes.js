const express = require("express");

const router = express.Router();

const {
    createProfile,
    getEntrepreneurs,
    getEntrepreneurById
} = require("../controllers/entrepreneurController");

const authMiddleware = require("../middleware/authMiddleware");


// Create Entrepreneur Profile

router.post(
    "/create",
    authMiddleware,
    createProfile
);
// Get all entrepreneurs

router.get(
    "/",
    getEntrepreneurs
);


// Get entrepreneur by ID

router.get(
    "/:id",
    getEntrepreneurById
);


module.exports = router;