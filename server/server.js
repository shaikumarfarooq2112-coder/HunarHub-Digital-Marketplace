const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const entrepreneurRoutes = require("./routes/entrepreneurRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const complaintRoutes =require("./routes/complaintRoutes");

// Load environment variables from .env
dotenv.config();

connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use(
    "/api/entrepreneurs",
    entrepreneurRoutes
);
app.use(
    "/api/products",
    productRoutes
);
app.use(
    "/api/service-requests",
    serviceRequestRoutes
);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(
    "/api/complaints",
    complaintRoutes
);
app.use(
    "/api/admin",
    adminRoutes
);


// Home route
app.get("/", (req, res) => {
    res.send("HunarHub Backend is Running...");
});

// Read port from .env
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});