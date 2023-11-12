const userModel = require("../models/UserModel");
const profileModel = require("../models/ProfileModel");
const sendEmail = require("../utility/SendEmail");
const { EncodeToken } = require("../utility/TokenHelper");


// Sending User OTP

const UserOTP = async (req) => {

    try {
        let email = req.params.email // take email from request parameter (.email)

        let otpCode = Math.floor(100000 + Math.random() * 900000)
        let EmailText = "Your Verfication Code is" + otpCode;
        let EmailSubject = "Verify Your Email"

        // Send Email
        await sendEmail(email, EmailText, EmailSubject)

        //Query 
        await userModel.updateOne(
            { email: email }, // filter
            { $set: { otp: otpCode } }, //update:  this otp take from userModel (email & otp this two property comes from UserModel)
            { upsert: true })

        return { status: "Success", message: "6 Digit OTP has been send" }

    }

    catch (error) {

        return { status: "Failed", message: "Something Went Wrong" }

    }

}


// User Verify

const UserVerify = async (req) => {
    try {
        let emailId = req.params.email;
        let otpCode = req.params.otp;
        if (otpCode === "0") {
            return { status: "fail", message: "Something Went Wrong" }
        }

        else {
            let total = await userModel.find({ email: emailId, otp: otpCode }).count('total');
            if (total === 1) {
                let user_id = await userModel.find({ email: emailId, otp: otpCode }).select('_id')
                let token = EncodeToken(emailId, user_id[0]['_id'].toString())
                await userModel.updateOne({ email: emailId }, { $set: { otp: '0' } }, { upsert: true })
                //update:  this otp take from userModel (email & otp this two property comes from UserModel)
                return { status: "success", message: "Valid OTP", token: token }
            } else {
                return { status: "fail", message: "Something Went Wrong" }
            }
        }
    }
    catch (e) {
        return { status: "fail", data: "Something Went Wrong" }
    }
}



// User Profile Create & Update

const UserProfileSave = async (req) => {
    try {
        let user_id = req.headers.id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await profileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true })
        return { status: "success", message: "Profile Save Changed" }
    }
    catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}


// User Profile Details

const UserProfileDetails = async (req) => {
    try {
        let user_id = req.headers.id;
        let result = await profileModel.find({ userID: user_id })
        return { status: "success", data: result }
    }
    catch (e) {
        return { status: "fail", data: "Something Went Wrong" }
    }
}





module.exports = { UserOTP, UserVerify, UserProfileSave, UserProfileDetails };
