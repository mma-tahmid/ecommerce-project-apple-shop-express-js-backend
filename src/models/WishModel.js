const mongoose = require('mongoose');

const wishSchema = mongoose.Schema({

    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
},
    { timestamps: true, versionKey: false }
)
const wishModel = mongoose.model('wishes', wishSchema);

module.exports = wishModel;