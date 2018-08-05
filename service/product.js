const Product = require('../model/product'); //相当于创建了一个实体对象
const config = require('../config');

/**
 * 分页获取商品信息
 * @param page
 * @returns {Promise<*>}
 */
async function getProductsByPage(page =0) {
    if(page<0){
        throw Error('page不能小于0')
    }
    let products = await Product.find({}).limit(config.PageCount).skip(config.PageCount * page)
        .sort('-created').select('-__v');
    return products
}

/**
 * 通过id获取单个商品
 * @param id
 * @returns {Promise<*>}
 */
async function getProductById(id) {
    let res = await Product.findOne({_id: id});
    return res;
}

/**
 * 更新某一项的内容
 * @param id
 * @param update
 * @returns {Promise<void>}
 */
async function updateProductById(id,update) {
    let res = await Product.updateOne({_id: id}, update);
    if(!res ||res.n ===0){
        throw Error("更新失败")
    }
}

/**
 * 删除某一个产品
 * @param id
 * @returns {Promise<void>}
 */
async function deleteProduct(id) {
    let res = await Product.deleteOne({_id: id})
    if(!res ||res.n ===0){
        throw Error("删除失败")
    }
}
async function addProduct(product) {
    product.created = Date.now()
    let res = await Product.create(product)
}

module.exports = {
    getProductsByPage,
    getProductById,
    updateProductById,
    deleteProduct,
    addProduct
}