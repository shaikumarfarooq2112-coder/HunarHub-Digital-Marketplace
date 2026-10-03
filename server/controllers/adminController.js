const User = require("../models/User");
const Entrepreneur = require("../models/Entrepreneur");
const Product = require("../models/Product");
const Order = require("../models/Order");
const ServiceRequest = require("../models/ServiceRequest");
const Category = require("../models/Category");


// =====================================================
// ADMIN DASHBOARD STATISTICS
// =====================================================

const getDashboardStats = async (req, res) => {

    try {

        const totalUsers =
            await User.countDocuments();

        const totalEntrepreneurs =
            await Entrepreneur.countDocuments();

        const verifiedEntrepreneurs =
            await Entrepreneur.countDocuments({
                verified: true
            });

        const pendingEntrepreneurs =
            await Entrepreneur.countDocuments({
                verified: false
            });

        const totalProducts =
            await Product.countDocuments();

        const totalOrders =
            await Order.countDocuments();

        const totalServiceRequests =
            await ServiceRequest.countDocuments();


        res.status(200).json({

            totalUsers,

            totalEntrepreneurs,

            verifiedEntrepreneurs,

            pendingEntrepreneurs,

            totalProducts,

            totalOrders,

            totalServiceRequests

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// GET ALL ENTREPRENEURS
// =====================================================

const getEntrepreneurs = async (req, res) => {

    try {

        const entrepreneurs =
            await Entrepreneur.find()
            .populate(
                "user",
                "name email phone"
            )
            .sort({
                createdAt: -1
            });


        res.status(200).json({
            entrepreneurs
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// APPROVE ENTREPRENEUR
// =====================================================

const approveEntrepreneur = async (req, res) => {

    try {

        const entrepreneur =
            await Entrepreneur.findByIdAndUpdate(

                req.params.id,

                {
                    verified: true
                },

                {
                    new: true
                }

            );


        if (!entrepreneur) {

            return res.status(404).json({

                message:
                "Entrepreneur not found"

            });

        }


        res.status(200).json({

            message:
            "Entrepreneur approved successfully",

            entrepreneur

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// REJECT ENTREPRENEUR
// =====================================================

const rejectEntrepreneur = async (req, res) => {

    try {

        const entrepreneur =
            await Entrepreneur.findByIdAndUpdate(

                req.params.id,

                {
                    verified: false
                },

                {
                    new: true
                }

            );


        if (!entrepreneur) {

            return res.status(404).json({

                message:
                "Entrepreneur not found"

            });

        }


        res.status(200).json({

            message:
            "Entrepreneur rejected",

            entrepreneur

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL ORDERS
// =====================================================

const getOrders = async (req, res) => {

    try {

        const orders =
            await Order.find()
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            orders

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL SERVICE REQUESTS
// =====================================================

const getServiceRequests = async (req, res) => {

    try {

        const requests =
            await ServiceRequest.find()
            .populate(
                "customer",
                "name email"
            )
            .populate(
                "entrepreneur",
                "name category location"
            )
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            requests

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


// =====================================================
// GET ALL USERS
// =====================================================

const getUsers = async (req, res) => {

    try {

        const users =
            await User.find()
            .select("-password")
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            users

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};

// =====================================================
// CATEGORY MANAGEMENT
// =====================================================

const getCategories = async (req, res) => {

    try {

        const categories =
            await Category.find()
            .sort({
                name: 1
            });

        res.status(200).json({
            categories
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// ADD CATEGORY
// =====================================================

const addCategory = async (req, res) => {

    try {

        const { name } = req.body;

        if (!name) {

            return res.status(400).json({
                message: "Category name is required"
            });

        }

        const existingCategory =
            await Category.findOne({
                name: name.trim()
            });

        if (existingCategory) {

            return res.status(400).json({
                message: "Category already exists"
            });

        }

        const category =
            await Category.create({
                name: name.trim()
            });

        res.status(201).json({

            message: "Category added successfully",

            category

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// ADD SKILL
// =====================================================

const addSkill = async (req, res) => {

    try {

        const { id } = req.params;
        const { skill } = req.body;

        if (!skill) {

            return res.status(400).json({
                message: "Skill name is required"
            });

        }

        const category =
            await Category.findById(id);

        if (!category) {

            return res.status(404).json({
                message: "Category not found"
            });

        }

        const skillName =
            skill.trim();

        if (
            category.skills.some(
                existingSkill =>
                    existingSkill.toLowerCase() ===
                    skillName.toLowerCase()
            )
        ) {

            return res.status(400).json({
                message: "Skill already exists"
            });

        }

        category.skills.push(skillName);

        await category.save();

        res.status(200).json({

            message: "Skill added successfully",

            category

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// DELETE CATEGORY
// =====================================================

const deleteCategory = async (req, res) => {

    try {

        const category =
            await Category.findByIdAndDelete(
                req.params.id
            );

        if (!category) {

            return res.status(404).json({
                message: "Category not found"
            });

        }

        res.status(200).json({

            message: "Category deleted successfully"

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// DELETE SKILL
// =====================================================

const deleteSkill = async (req, res) => {

    try {

        const { id, skill } =
            req.params;

        const category =
            await Category.findById(id);

        if (!category) {

            return res.status(404).json({
                message: "Category not found"
            });

        }

        category.skills =
            category.skills.filter(
                existingSkill =>
                    existingSkill !== skill
            );

        await category.save();

        res.status(200).json({

            message: "Skill deleted successfully",

            category

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

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

};