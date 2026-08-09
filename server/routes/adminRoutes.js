const express = require("express");

const router = express.Router();


// Middleware
const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");


// Controller
const {

    getDashboardStats,

    getEntrepreneurs,

    approveEntrepreneur,

    rejectEntrepreneur,

    getOrders,

    getServiceRequests,

    getUsers

} = require("../controllers/adminController");


// =====================================================
// DASHBOARD STATISTICS
// =====================================================

router.get(

    "/stats",

    authMiddleware,

    adminMiddleware,

    getDashboardStats

);


// =====================================================
// ENTREPRENEURS
// =====================================================

router.get(

    "/entrepreneurs",

    authMiddleware,

    adminMiddleware,

    getEntrepreneurs

);


// =====================================================
// APPROVE ENTREPRENEUR
// =====================================================

router.put(

    "/entrepreneurs/:id/approve",

    authMiddleware,

    adminMiddleware,

    approveEntrepreneur

);


// =====================================================
// REJECT ENTREPRENEUR
// =====================================================

router.put(

    "/entrepreneurs/:id/reject",

    authMiddleware,

    adminMiddleware,

    rejectEntrepreneur

);


// =====================================================
// ORDERS
// =====================================================

router.get(

    "/orders",

    authMiddleware,

    adminMiddleware,

    getOrders

);


// =====================================================
// SERVICE REQUESTS
// =====================================================

router.get(

    "/service-requests",

    authMiddleware,

    adminMiddleware,

    getServiceRequests

);


// =====================================================
// USERS
// =====================================================

router.get(

    "/users",

    authMiddleware,

    adminMiddleware,

    getUsers

);


module.exports = router;