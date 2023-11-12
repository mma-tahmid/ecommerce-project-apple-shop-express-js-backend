const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: { type: String, trim: true, required: true, unique: true },
    categoryImg: { type: String, trim: true, required: true },
},
    { timestamps: true, versionKey: false }
)

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
