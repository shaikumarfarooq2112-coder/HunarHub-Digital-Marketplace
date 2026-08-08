const express = require("express");

const router = express.Router();

const {
    createServiceRequest,
    getCustomerRequests,
    getEntrepreneurRequests,
    updateRequestStatus

} = require("../controllers/serviceRequestController");


const authMiddleware = require("../middleware/authMiddleware");


// ================= CREATE SERVICE REQUEST =================

router.post(
    "/create",
    authMiddleware,
    createServiceRequest
);
// ================= GET CUSTOMER REQUESTS =================

router.get(
    "/customer",
    authMiddleware,
    getCustomerRequests
);

// ================= GET ENTREPRENEUR REQUESTS =================

router.get(
    "/entrepreneur",
    authMiddleware,
    getEntrepreneurRequests
);


// ================= UPDATE REQUEST STATUS =================

router.put(
    "/update/:id",
    authMiddleware,
    updateRequestStatus
);


module.exports = router;