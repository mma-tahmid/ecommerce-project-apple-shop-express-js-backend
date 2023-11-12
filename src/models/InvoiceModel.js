const mongoose = require('mongoose');


const invoiceSchema = mongoose.Schema({

    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    //total: { type: String, required: true },
    //vat: { type: String, required: true },
    payable: { type: String, required: true },
    cus_details: { type: String, required: true },
    ship_details: { type: String, required: true },
    tran_id: { type: String, required: true },
    val_id: { type: String, required: true, default: '0' },

    delivery_status: { type: String, required: true },
    payment_status: { type: String, required: true },

},
    { timestamps: true, versionKey: false }
)
const invoiceModel = mongoose.model('invoices', invoiceSchema);

module.exports = invoiceModel;