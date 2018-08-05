const Order = require('../model/order');
const config = require('../config');
const productService = require('./product');
const Big = require('big.js');

//分页查询订单
async function getOrdersByPage(page=0) {
   return await Order.find().limit(config.PageCount).skip(page*config.PageCount)
        .sort('-created').select("-__v")
}
//通过id查询某一项订单
async function getOrderById(id) {
    return await Order.findOne({_id:id})
}
//添加订单
async function addOrder(order) {
    //1.根据商品id查询出商品
    let product = await productService.getProductById(order.productId);
    if(!product){
        throw Error("未找到商品")
    }
    //判断库存够不够
    if(product.stock<order.count){
        throw Error("商品库存不够")
    }
    order.productName = product.name;
    order.productPrice = product.price;
    order.total = Big(order.productPrice).times(order.count);//乘法
    order.created = Date.now();
    let res = await Order.create(order);

    //2.减去库存
    let update = {
        stock:product.stock - order.count
    };
    await productService.updateProductById(order.productId,update)
    return res
}
module.exports = {
    getOrdersByPage,
    getOrderById,
    addOrder
}