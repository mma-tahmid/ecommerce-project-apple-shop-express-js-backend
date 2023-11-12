const productsModel = require("../models/ProductModel");
const cartsModel = require("../models/CartModel");


const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

// Create Cart

const CreateCart = async (req) => {

    try {

        let user_id = req.headers.id;
        let reqBody = req.body;  // receive product ID
        let productId = reqBody.productID

        // Price Calculation

        let product = await productsModel.findOne({ _id: productId })
        let price = product.price;   // .price from Database
        if (product.discount) {  // if discount is true
            price = product.discountPrice  // .discountPrice from productModel.js
        }


        let totalPrice = price * reqBody.qty;

        reqBody.userID = user_id;
        reqBody.price = totalPrice;

        await cartsModel.updateOne(
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

        return { status: "Success", message: "Cart Item is Created " }


    }

    catch (error) {
        return { status: "Fail", message: "Cart Item is Not  Created Successfuly" }
    }

}



// Remove Cart

const RemoveCart = async (req) => {

    try {

        let user_id = req.headers.id;
        let reqBody = req.body;  // receive product ID

        reqBody.userID = user_id   //userID comes from WishModel

        await cartsModel.deleteOne(

            // filter (match)
            {
                userID: user_id,
                productID: reqBody.productID
            }

        )

        return { status: "Success", message: "Cart Item is Deleted" }


    }

    catch (error) {
        return { status: "Fail", message: "Cart Item is Not Deleted Successfuly" }
    }

}


// Show Product Details in Cart List

const CartList = async (req) => {

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

        let result = await cartsModel.aggregate([
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
        return { status: "Fail", message: "Cart List is Not Find " }
    }

}




module.exports = { CreateCart, RemoveCart, CartList }