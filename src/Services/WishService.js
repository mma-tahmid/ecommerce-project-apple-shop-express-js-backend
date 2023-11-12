const wishesModel = require("../models/WishModel");

const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const CreateWish = async (req) => {

    try {

        let user_id = req.headers.id;
        let reqBody = req.body;  // receive product ID

        reqBody.userID = user_id   //userID comes from WishModel

        await wishesModel.updateOne(
            // filter (match)
            {
                userID: user_id,
                productID: reqBody.productID
            },

            // update

            { $set: reqBody },

            // option

            { upsert: true }

        )

        return { status: "Success", message: "Wish Created Successfully" }


    }

    catch (error) {
        return { status: "Fail", message: "Wish  is Not Created Successfuly" }
    }

}



// Remove Wish

const RemoveWish = async (req) => {

    try {

        let user_id = req.headers.id;
        let reqBody = req.body;  // receive product ID

        reqBody.userID = user_id   //userID comes from WishModel

        await wishesModel.deleteOne(

            // filter (match)
            {
                userID: user_id,
                productID: reqBody.productID
            }

        )

        return { status: "Success", message: "Wish is Deleted" }


    }

    catch (error) {
        return { status: "Fail", message: "Wish is Not Deleted Successfuly" }
    }

}


// Show Product Details in Wish List

const ALLWish = async (req) => {

    try {

        let user_id = new objectId(req.headers.id)  // Convert String to Object ID

        let matchStage = { $match: { userID: user_id } }

        let joinStagePrdouct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "ProductDetails" } }
        let unwindProductStage = { $unwind: "$ProductDetails" }  // convert Single Object

        let joinStageBrand = { $lookup: { from: "brands", localField: "ProductDetails.brandID", foreignField: "_id", as: "brandDetails" } }
        // brand table ar _id
        let unwindBrandStage = { $unwind: "$brandDetails" }  // convert Single Object

        let joinStageCategory = { $lookup: { from: "categories", localField: "ProductDetails.categoryID", foreignField: "_id", as: "CategoriesssDetails" } }
        let unwindCategoryStage = { $unwind: "$CategoriesssDetails" }  // convert Single Object 


        let projectionStage = {
            $project: {
                '_id': 0, "userID": 0, "createdAt": 0, "updatedAt": 0, "ProductDetails._id": 0,
                "ProductDetails.categoryID": 0, "ProductDetails.brandID": 0, "brandDetails._id": 0,
                "CategoriesssDetails._id": 0

            }
        }

        let result = await wishesModel.aggregate([
            matchStage,
            joinStagePrdouct,
            unwindProductStage,
            joinStageBrand,
            unwindBrandStage,
            joinStageCategory,
            unwindCategoryStage,
            projectionStage

        ])

        return { status: "Success", data: result }


    }

    catch (error) {
        return { status: "Fail", message: "Wish List is Not Find Successfuly" }
    }

}




module.exports = { CreateWish, RemoveWish, ALLWish }