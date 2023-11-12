const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    brandName: { type: String, trim: true, required: true, unique: true },
    brandImg: { type: String, trim: true, required: true },
},
    { timestamps: true, versionKey: false }
)

const brandModel = mongoose.model('brands', brandSchema);

module.exports = brandModel;