const Review = require("../models/Review");
const Product = require("../models/Product");
const Entrepreneur = require("../models/Entrepreneur");


// ================= CREATE REVIEW =================

const createReview = async (req, res) => {

    try {

        const {
            productId,
            rating,
            comment
        } = req.body;


        // Find product

        const product = await Product.findById(productId);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        const review = await Review.create({

            customer: req.user.id,

            product: product._id,

            entrepreneur: product.entrepreneur,

            rating,

            comment

        });


        res.status(201).json({

            message: "Review added successfully",

            review

        });



    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};



// ================= GET PRODUCT REVIEWS =================

const getProductReviews = async (req,res)=>{

    try {


        const reviews = await Review.find({

            product:req.params.id

        })
        .populate(
            "customer",
            "name"
        );


        res.status(200).json({

            reviews

        });


    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};



// ================= GET ENTREPRENEUR REVIEWS =================

const getEntrepreneurReviews = async(req,res)=>{

    try{


        const reviews = await Review.find({

            entrepreneur:req.params.id

        })
        .populate(
            "customer",
            "name"
        )
        .populate(
            "product",
            "name"
        );


        res.status(200).json({

            reviews

        });


    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};



module.exports = {

    createReview,

    getProductReviews,

    getEntrepreneurReviews

};