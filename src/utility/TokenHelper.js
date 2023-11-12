const jwt = require("jsonwebtoken")

// Encode Token or Create token Function

exports.EncodeToken = (email, user_id) => {
    return jwt.sign({ email: email, id: user_id }, "ABC123", { expiresIn: '1h' });
}



// Decode Token

exports.DecodeToken = (token) => {
    try {
        return jwt.verify(token, 'ABC123');
    }
    catch (err) {
        return null;
    }
}