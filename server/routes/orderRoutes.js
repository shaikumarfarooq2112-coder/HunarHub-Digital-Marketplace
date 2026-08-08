const express = require("express");

const router = express.Router();


const {

    createOrder,
    getMyOrders,
    getEntrepreneurOrders,
    updateOrderStatus

} = require("../controllers/orderController");


const authMiddleware = require("../middleware/authMiddleware");


// ================= CREATE ORDER =================

router.post(
    "/create",
    authMiddleware,
    createOrder
);


// ================= CUSTOMER ORDER HISTORY =================

router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
);


// ================= ENTREPRENEUR ORDERS =================

router.get(
    "/entrepreneur",
    authMiddleware,
    getEntrepreneurOrders
);


// ================= UPDATE ORDER STATUS =================

router.put(
    "/update/:id",
    authMiddleware,
    updateOrderStatus
);


module.exports = router;