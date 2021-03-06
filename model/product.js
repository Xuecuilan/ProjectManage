const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'商品的名字不能少'],
        unique:true
    },
    price:{
        type:String,
        required:[true,'商品价格不能少']
    },
    stock:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'分类id不能为空']
    },
    description:{
        type:String,
    },
    isOnSale:{ //是否上架
        type:Boolean,
        default:true
    },
    created:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('product',schema)