const { CalculateInvoice } = require("../Services/InvoiceService");

exports.InvoiceCreate = async (req, res) => {
    let result = await CalculateInvoice(req);
    return res.status(200).json(result)
}