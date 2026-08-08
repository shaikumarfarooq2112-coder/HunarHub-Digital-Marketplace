const Product = require("../models/Product");
const Entrepreneur = require("../models/Entrepreneur");

// CREATE PRODUCT
// CREATE PRODUCT
const createProduct = async (req, res) => {

    try {

        const entrepreneur = await Entrepreneur.findOne({
            user: req.user.id
        });

        if (!entrepreneur) {
            return res.status(404).json({
                message: "Entrepreneur profile not found"
            });
        }


        const {
            name,
            category,
            description,
            price,
            image
        } = req.body;


        const product = await Product.create({

            name,
            category,
            description,
            price,
            image,
            entrepreneur: entrepreneur._id

        });


        res.status(201).json({

            message: "Product added successfully",
            product

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {

    try {

        const products = await Product.find().populate(
            "entrepreneur",
            "name category location"
        );

        res.status(200).json({
            products
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// ================= GET PRODUCT BY ID =================

const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id).populate(
            "entrepreneur",
            "name category location"
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// ================= SEARCH PRODUCTS =================

const searchProducts = async (req, res) => {

    try {

        const search = req.query.name;

        const products = await Product.find({

            name: {
                $regex: search,
                $options: "i"
            }

        }).populate(

            "entrepreneur",

            "name category location"

        );


        res.status(200).json({

            products

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ================= FILTER PRODUCTS BY CATEGORY =================

const filterProductsByCategory = async (req, res) => {

    try {

        const category = req.params.category;

        const products = await Product.find({
            category: category
        }).populate(
            "entrepreneur",
            "name category location"
        );

        res.status(200).json({
            products
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
// ================= FILTER PRODUCTS BY PRICE =================

const filterProductsByPrice = async (req, res) => {

    try {

        const { min, max } = req.query;


        let filter = {};


        if (min && max) {

            filter.price = {
                $gte: Number(min),
                $lte: Number(max)
            };

        }
        else if (min) {

            filter.price = {
                $gte: Number(min)
            };

        }
        else if (max) {

            filter.price = {
                $lte: Number(max)
            };

        }


        const products = await Product.find(filter)
            .populate(
                "entrepreneur",
                "name category location"
            );


        res.status(200).json({
            products
        });


    } catch(error) {


        res.status(500).json({
            message:error.message
        });


    }

};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    searchProducts,
    filterProductsByCategory,
    filterProductsByPrice
};