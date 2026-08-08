const Entrepreneur = require("../models/Entrepreneur");


// ================= CREATE ENTREPRENEUR PROFILE =================

const createProfile = async (req, res) => {

    try {

        const {
            name,
            category,
            experience,
            location,
            skills,
            description
        } = req.body;


        const entrepreneur = await Entrepreneur.create({

            user: req.user.id,

            name,

            category,

            experience,

            location,

            skills,

            description

        });


        res.status(201).json({

            message: "Entrepreneur profile created successfully",

            entrepreneur

        });


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ================= GET ALL ENTREPRENEURS =================

const getEntrepreneurs = async (req, res) => {

    try {

        const entrepreneurs = await Entrepreneur.find()
            .populate("user", "name email");


        res.status(200).json({

            entrepreneurs

        });


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};



// ================= GET ENTREPRENEUR BY ID =================

const getEntrepreneurById = async (req, res) => {

    try {

        const entrepreneur = await Entrepreneur.findById(
            req.params.id
        )
        .populate(
            "user",
            "name email"
        );


        if(!entrepreneur){

            return res.status(404).json({

                message:"Entrepreneur not found"

            });

        }


        res.status(200).json({

            entrepreneur

        });


    } catch(error) {


        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {
    createProfile,
    getEntrepreneurs,
    getEntrepreneurById
};