const cartsModel = require("../models/CartModel");

const mongoose = require("mongoose");
const profilesModel = require("../models/ProfileModel");
const objectId = mongoose.Types.ObjectId;


const CalculateInvoice = async (req) => {

    try {

        // invoice Calculation

        let user_id = new objectId(req.headers.id);

        let result = await cartsModel.aggregate([

            { $match: { userID: user_id } },
            { $group: { _id: 0, sum: { $sum: { $toDecimal: "$price" } } } }  // gropuing 0


        ]);

        let payable = result[0].sum;
        let tran_id = Math.floor(100000000 + Math.random() * 900000000);
        let val_id = 0;
        let delivery_status = "pending";
        let payment_status = "pending"

        // Profile Details

        let profile = await profilesModel.aggregate([

            { $match: { userID: user_id } },

        ])

        // Customer & Shipping Details
        let cus_details = `Name: ${profile[0].cus_name}, Email: ${profile[0].cus_email}, Address: ${profile[0].cus_add}, Phone: ${profile[0].cus_phone}`
        let ship_details = `Name: ${profile[0].ship_name}, City: ${profile[0].ship_city}, Address: ${profile[0].ship_add}, Phone: ${profile[0].ship_phone}`




        // Pending payment Invoice Create

        // Invoice Product List Insert 

        // SSL Commerce Payment Gateway Call- Get Payment URL





        return { status: "Success", message: profile }


    }

    catch (error) {
        return { status: "Fail", message: "hghg" }
    }

}




module.exports = { CalculateInvoice }