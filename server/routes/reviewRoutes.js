const express = require("express");

const router = express.Router();

const {
    createReview,
    getProductReviews,
    getEntrepreneurReviews
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");


// ================= CREATE REVIEW =================

router.post(
    "/create",
    authMiddleware,
    createReview
);


// ================= GET PRODUCT REVIEWS =================

router.get(
    "/product/:id",
    getProductReviews
);


// ================= GET ENTREPRENEUR REVIEWS =================

router.get(
    "/entrepreneur/:id",
    getEntrepreneurReviews
);


module.exports = router;