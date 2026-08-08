const express = require("express");

const router = express.Router();


const {
    createProduct,
    getProducts,
    getProductById,
    searchProducts,
    filterProductsByCategory,
    filterProductsByPrice
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");


// Create Product Route

router.post(
    "/create",
    authMiddleware,
    createProduct
);
// Get All Products
router.get(
    "/",
    getProducts
);
router.get("/search", searchProducts);
router.get("/category/:category", filterProductsByCategory);
router.get(
    "/filter/price",
    filterProductsByPrice
);
// Get Product By ID
router.get(
    "/:id",
    getProductById
);


module.exports = router;