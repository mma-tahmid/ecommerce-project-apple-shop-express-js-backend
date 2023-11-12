
const categoryModel = require("../models/CategoryModel")
const brandModel = require("../models/BrandModel");
const productsModel = require("../models/ProductModel");
const mongoose = require("mongoose");
const updateObjectId = mongoose.Types.ObjectId;

const productsSliderModel = require("../models/ProductSliderModel")



const AllCategories = async () => {

    try {
        let result = await categoryModel.find();
        return { status: "Success", data: result }

    }

    catch (error) {

        return { status: "Fail", data: "Something Went Wrong" }


    }
}


// All Brands

const AllBrands = async () => {

    try {

        let result = await brandModel.find()
        return { status: "Success", data: result }

    }

    catch (error) {
        return { status: "Failed", data: "Something Went Wrong" }
    }
}



//Product Remark from Product Model

const ProductBYRemark = async (req) => {
    try {

        let remark = req.params.remark

        let JoinStage1 = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "categoryDetails" } };
        let JoinStage2 = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brandDetails" } };

        let matchStage = { $match: { remark: remark } }

        let projectionStage = { $project: { 'categoryDetails._id': 0, 'brandDetails._id': 0, 'categoryID': 0, 'brandID': 0 } }

        let unwindCategoryStage = { $unwind: "$categoryDetails" }
        let unwindBrandStage = { $unwind: "$brandDetails" }

        let result = await productsModel.aggregate(
            [matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage]
        )

        return { status: "success", data: result }
    }
    catch (e) {
        return { status: "fail", data: e.toString() }
    }
}

// Product By Category from Product Model

const ProductBYCategory = async (req) => {
    try {
        let categoryId = new updateObjectId(req.params.categoryID)

        let JoinStage1 = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "categoryDetails" } };
        let JoinStage2 = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brandDetails" } };
        // only change match stage
        let matchStage = { $match: { categoryID: categoryId } }

        let projectionStage = { $project: { 'category._id': 0, 'brand._id': 0, 'categoryID': 0, 'brandID': 0 } }
        let unwindCategoryStage = { $unwind: "$categoryDetails" }
        let unwindBrandStage = { $unwind: "$brandDetails" }

        let data = await productsModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return { status: "success", data: data }
    }
    catch (e) {
        return { status: "fail", data: e.toString() }
    }
}


// Product By Brand from Product Model

const ProductBYBrand = async (req) => {
    try {
        let brandId = new updateObjectId(req.params.brandID)

        let JoinStage1 = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "categoryDetails" } };
        let JoinStage2 = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brandDetails" } };
        let matchStage = { $match: { brandID: brandId } }

        let projectionStage = { $project: { 'category._id': 0, 'brand._id': 0, 'categoryID': 0, 'brandID': 0 } }
        let unwindCategoryStage = { $unwind: "$categoryDetails" }
        let unwindBrandStage = { $unwind: "$brandDetails" }

        let data = await productsModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])

        return { status: "success", data: data }
    }
    catch (e) {
        return { status: "fail", data: e.toString() }
    }
}


//product By Category with similar product (limit fixed) from Product Model 

const ProductBYCategoryLimit10 = async (req) => {
    try {
        let categoryId = new updateObjectId(req.params.categoryID)

        let JoinStage1 = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "categoryDetails" } };
        let JoinStage2 = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brandDetails" } };
        let matchStage = { $match: { categoryID: categoryId } }

        let limit = { $limit: 10 }

        let projectionStage = { $project: { 'category._id': 0, 'brand._id': 0, 'categoryID': 0, 'brandID': 0 } }
        let unwindCategoryStage = { $unwind: "$categoryDetails" }
        let unwindBrandStage = { $unwind: "$brandDetails" }

        let result = await productsModel.aggregate([matchStage, limit, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage])

        return { status: "success", data: result }
    }
    catch (e) {
        return { status: "fail", data: e.toString() }
    }
}

// Product Slider from Product Model

const ProductBYSlider = async (req) => {
    try {
        let matchStage = { $match: {} }
        let limit = { $limit: 5 }
        let result = await productsSliderModel.aggregate([matchStage, limit])
        return { status: "success", data: result }
    }
    catch (e) {
        return { status: "fail", data: e.toString() }
    }
}


// Product by Keword (title and Description)

const ProductBYKeyword = async (req) => {
    try {


        let SearchRegex = { "$regex": req.params.keyword, "$options": "i" }
        let SearchParam = [{ title: SearchRegex }, { shortDes: SearchRegex }]
        let SearchQuery = { $or: SearchParam }

        let matchStage = { $match: SearchQuery };

        let JoinStage1 = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "categoryDetails" } };
        let JoinStage2 = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brandDetails" } };


        let projectionStage = { $project: { 'category._id': 0, 'brand._id': 0, 'categoryID': 0, 'brandID': 0 } }
        let unwindCategoryStage = { $unwind: "$categoryDetails" }
        let unwindBrandStage = { $unwind: "$brandDetails" }

        let data = await productsModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage])


        return { status: "success", data: data }
    }
    catch (e) {
        return { status: "fail", data: e.toString() }
    }
}







module.exports = { AllCategories, AllBrands, ProductBYRemark, ProductBYCategory, ProductBYBrand, ProductBYCategoryLimit10, ProductBYSlider, ProductBYKeyword }

