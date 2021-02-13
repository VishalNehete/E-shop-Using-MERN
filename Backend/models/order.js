//to connect to mongodb cloud=>library
const mongoose=require('mongoose');

const orderSchema = mongoose.Schema({
    
})

exports.Order=mongoose.model('Order',orderSchema);