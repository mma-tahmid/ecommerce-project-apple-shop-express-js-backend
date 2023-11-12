
// Product By Remark

const { CreateCart, RemoveCart, CartList } = require("../Services/CartService")
const { ProductBYRemark, ProductBYCategory, ProductBYBrand, ProductBYCategoryLimit10, ProductBYSlider, ProductBYKeyword } = require("../Services/ProductService")
const { CreateWish, RemoveWish, ALLWish } = require("../Services/WishService")

exports.ListByRemark = async (req, res) => {
    let result = await ProductBYRemark(req)
    return res.status(200).json(result)
}

// Product By Category

exports.ListByCategory = async (req, res) => {
    let result = await ProductBYCategory(req)
    return res.status(200).json(result)
}

// Product By Brand

exports.ListByBrand = async (req, res) => {
    let result = await ProductBYBrand(req)
    return res.status(200).json(result)
}

// Product By category with similar product

exports.ListBySmilier = async (req, res) => {
    let result = await ProductBYCategoryLimit10(req)
    return res.status(200).json(result)
}

// Product Slider

exports.SliderList = async (req, res) => {
    let result = await ProductBYSlider(req)
    return res.status(200).json(result)
}

// Product Search by keyword

exports.ListByKeyword = async (req, res) => {
    let result = await ProductBYKeyword(req)
    return res.status(200).json(result)
}


// ----WISHLIST-----

// Create WISHLIST

exports.CreateWishList = async (req, res) => {
    let result = await CreateWish(req)
    return res.status(200).json(result)
}

// Remove WishLIST

exports.RemoveWishList = async (req, res) => {
    let result = await RemoveWish(req)
    return res.status(200).json(result)
}


// Show All WishList 

exports.ALLWishList = async (req, res) => {
    let result = await ALLWish(req)
    return res.status(200).json(result)
}

// ------- CART-------

// Create CART

exports.CreateCartItem = async (req, res) => {
    let result = await CreateCart(req)
    return res.status(200).json(result)
}

// Remove WishLIST

exports.RemoveCartItem = async (req, res) => {
    let result = await RemoveCart(req)
    return res.status(200).json(result)
}


// Show All WishList 

exports.AllCartList = async (req, res) => {
    let result = await CartList(req)
    return res.status(200).json(result)
} 