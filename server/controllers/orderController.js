const Order = require("../models/Order");
const Product = require("../models/Product");
const Entrepreneur = require("../models/Entrepreneur");


// ================= CREATE ORDER =================

const createOrder = async (req, res) => {

    try {

        const {
            productId,
            quantity
        } = req.body;


        // Find product

        const product = await Product.findById(productId);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        // Calculate total price

        const totalPrice = product.price * quantity;



        const order = await Order.create({

            customer: req.user.id,

            product: product._id,

            entrepreneur: product.entrepreneur,

            quantity,

            totalPrice

        });



        res.status(201).json({

            message: "Order created successfully",

            order

        });



    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};



// ================= CUSTOMER ORDERS =================

const getMyOrders = async (req,res)=>{

    try{


        const orders = await Order.find({

            customer:req.user.id

        })
        .populate(
            "product",
            "name price image"
        )
        .populate(
            "entrepreneur",
            "name category location"
        );


        res.status(200).json({

            orders

        });


    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};



// ================= ENTREPRENEUR ORDERS =================

const getEntrepreneurOrders = async(req,res)=>{


    try{


        const entrepreneur = await Entrepreneur.findOne({

            user:req.user.id

        });


        if(!entrepreneur){

            return res.status(404).json({

                message:"Entrepreneur profile not found"

            });

        }



        const orders = await Order.find({

            entrepreneur:entrepreneur._id

        })
        .populate(
            "customer",
            "name email phone"
        )
        .populate(
            "product",
            "name price"
        );


        res.status(200).json({

            orders

        });


    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};



// ================= UPDATE ORDER STATUS =================

const updateOrderStatus = async(req,res)=>{


    try{


        const {status}=req.body;


        const order = await Order.findByIdAndUpdate(

            req.params.id,

            {
                status:status
            },

            {
                new:true
            }

        );


        res.status(200).json({

            message:"Order status updated",

            order

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};



module.exports = {

    createOrder,

    getMyOrders,

    getEntrepreneurOrders,

    updateOrderStatus

};