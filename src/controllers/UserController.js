const jwt = require("jsonwebtoken");

const { UserOTP, UserVerify } = require("../Services/UserService");


// USER LOGIN

exports.UserLogin = async (req, res) => {

    let result = await UserOTP(req)

    return res.status(200).json(result)
}




// Verify Login

exports.VerifyLogin = async (req, res) => {
    let result = await UserVerify(req)
    return res.status(200).json(result)
}



