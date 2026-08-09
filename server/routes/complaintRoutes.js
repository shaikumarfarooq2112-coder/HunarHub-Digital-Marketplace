const express =
    require("express");

const router =
    express.Router();


const {

    createComplaint,

    getCustomerComplaints,

    getAllComplaints,

    updateComplaint

} =
    require(
        "../controllers/complaintController"
    );


const authMiddleware =
    require(
        "../middleware/authMiddleware"
    );


// =====================================================
// CREATE COMPLAINT
// =====================================================

router.post(

    "/create",

    authMiddleware,

    createComplaint

);


// =====================================================
// CUSTOMER COMPLAINTS
// =====================================================

router.get(

    "/customer",

    authMiddleware,

    getCustomerComplaints

);


// =====================================================
// ADMIN - GET ALL COMPLAINTS
// =====================================================

router.get(

    "/",

    authMiddleware,

    getAllComplaints

);


// =====================================================
// ADMIN - UPDATE COMPLAINT
// =====================================================

router.put(

    "/update/:id",

    authMiddleware,

    updateComplaint

);


module.exports =
    router;