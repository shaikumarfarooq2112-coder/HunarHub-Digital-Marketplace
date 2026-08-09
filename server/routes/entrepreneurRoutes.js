const express = require("express");

const router = express.Router();


// ================= CONTROLLERS =================

const {
    createProfile,
    getEntrepreneurs,
    getEntrepreneurById,
    updateAvailability,
    getEarnings
} = require("../controllers/entrepreneurController");


// ================= AUTH MIDDLEWARE =================

const authMiddleware =
    require("../middleware/authMiddleware");


router.post(
    "/create",
    authMiddleware,
    createProfile
);


router.get(
    "/",
    getEntrepreneurs
);


router.get(
    "/earnings",
    authMiddleware,
    getEarnings
);


router.put(
    "/availability",
    authMiddleware,
    updateAvailability
);


router.get(
    "/:id",
    getEntrepreneurById
);


module.exports = router;