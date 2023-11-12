const { UserProfileSave, UserProfileDetails } = require("../Services/UserService")




exports.CreateProfile = async (req, res) => {
    let result = await UserProfileSave(req)
    return res.status(200).json(result)
}


exports.ReadProfile = async (req, res) => {
    let result = await UserProfileDetails(req)
    return res.status(200).json(result)
}

exports.UpdateProfile = async (req, res) => {
    let result = await UserProfileSave(req)
    return res.status(200).json(result)
} 