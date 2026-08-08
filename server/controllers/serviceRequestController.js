const ServiceRequest = require("../models/ServiceRequest");
const Entrepreneur = require("../models/Entrepreneur");


// ================= CREATE SERVICE REQUEST =================

const createServiceRequest = async (req, res) => {

    try {

        const {
            entrepreneurId,
            service,
            description,
            date
        } = req.body;


        const request = await ServiceRequest.create({

            customer: req.user.id,

            entrepreneur: entrepreneurId,

            service,

            description,

            date

        });


        res.status(201).json({

            message: "Service request created successfully",

            request

        });


    } catch(error) {


        res.status(500).json({

            message: error.message

        });


    }

};

// ================= GET CUSTOMER REQUESTS =================

const getCustomerRequests = async (req, res) => {

    try {

        const requests = await ServiceRequest.find({

            customer: req.user.id

        })
        .populate(
            "entrepreneur",
            "name category location"
        );

        res.status(200).json({

            requests

        });

    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ================= GET ENTREPRENEUR REQUESTS =================

const getEntrepreneurRequests = async (req, res) => {

    try {


        const entrepreneur = await Entrepreneur.findOne({

            user: req.user.id

        });


        if(!entrepreneur){

            return res.status(404).json({

                message:"Entrepreneur profile not found"

            });

        }


        const requests = await ServiceRequest.find({

            entrepreneur: entrepreneur._id

        })
        .populate(
            "customer",
            "name email phone location"
        );


        res.status(200).json({

            requests

        });


    } catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};



// ================= UPDATE REQUEST STATUS =================

const updateRequestStatus = async (req,res)=>{

    try{

        const {status}=req.body;


        const request = await ServiceRequest.findByIdAndUpdate(
            req.params.id,
            {
              status: status
            },
            {
              new: true
            }
        );

        res.status(200).json({

            message:"Request status updated",

            request

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



module.exports = {

    createServiceRequest,

    getCustomerRequests,

    getEntrepreneurRequests,

    updateRequestStatus

};