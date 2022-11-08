const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    gen_Name:String,
    pin:String
});

module.exports = mongoose.model('medicine_lists',vendorSchema);