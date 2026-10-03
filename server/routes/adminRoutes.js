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
    getUsers,
    getCategories,
    addCategory,
    addSkill,
    deleteCategory,
    deleteSkill
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

// =====================================================
// CATEGORY MANAGEMENT
// =====================================================

router.get(
    "/categories",
    authMiddleware,
    adminMiddleware,
    getCategories
);


router.post(
    "/categories",
    authMiddleware,
    adminMiddleware,
    addCategory
);


router.post(
    "/categories/:id/skills",
    authMiddleware,
    adminMiddleware,
    addSkill
);


router.delete(
    "/categories/:id",
    authMiddleware,
    adminMiddleware,
    deleteCategory
);


router.delete(
    "/categories/:id/skills/:skill",
    authMiddleware,
    adminMiddleware,
    deleteSkill
);

module.exports = router;