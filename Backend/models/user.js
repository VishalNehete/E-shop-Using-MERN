//to connect to mongodb cloud=>library
const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    name:String,
    image:String,
    countInStock:{
        type:Number,
        required:true
    }
})

exports.User=mongoose.model('User',userSchema);