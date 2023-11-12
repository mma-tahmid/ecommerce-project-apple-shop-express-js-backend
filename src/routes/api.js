const express = require("express");

const userControllers = require("../controllers/UserController")
const authVerfication = require("../middlewares/AuthVerification")
const profileControllers = require("../controllers/ProfileController")
const brandControllers = require("../controllers/BrandController")
const categoryControllers = require("../controllers/CategoryController")
const productControllers = require("../controllers/ProductController")
const invoiceControllers = require("../controllers/InvoiceController")
const router = express.Router();




// USER

router.get("/user-login/:email", userControllers.UserLogin)
router.get("/verify-login/:email/:otp", userControllers.VerifyLogin)

// Brand
router.get("/brand-list", brandControllers.BrandList);

// Category
router.get("/category-list", categoryControllers.CategoryList)


// Profile
router.post("/create-profile", authVerfication, profileControllers.CreateProfile);
router.get("/read-profile", authVerfication, profileControllers.ReadProfile);
router.post("/update-profile", authVerfication, profileControllers.UpdateProfile);


// Product

router.get("/list-by-remark/:remark", productControllers.ListByRemark);
router.get('/list-by-category/:categoryID', productControllers.ListByCategory)
router.get('/list-by-brand/:brandID', productControllers.ListByBrand)
router.get('/list-by-smilier/:categoryID', productControllers.ListBySmilier)

router.get('/slider-List', productControllers.SliderList)
router.get('/list-by-keyword/:keyword', productControllers.ListByKeyword)


// WISH LIST

router.post("/create-wish-list", authVerfication, productControllers.CreateWishList);
router.post("/remove-wish-list", authVerfication, productControllers.RemoveWishList);
router.get("/all-wish-list", authVerfication, productControllers.ALLWishList);

// CART

router.post("/create-cart", authVerfication, productControllers.CreateCartItem);
router.post("/remove-cart", authVerfication, productControllers.RemoveCartItem);
router.get("/all-cart-list", authVerfication, productControllers.AllCartList);


// INVOICE

router.get('/invoice-create', authVerfication, invoiceControllers.InvoiceCreate)


module.exports = router;