const Category = require('../model/category');
const config = require('../config');

/**
 *分页查询分类的数据
 * @param page
 * @returns {Promise<void>}
 */
async function getCategorysByPage(page = 1) { //.query是写到params里面，.params是直接拼接到地址栏
   return await Category.find().skip(config.PageCount*(page-1)).limit(config.PageCount)
        .sort("created").select("-__v")
}
//添加分类  {name:服装}
async function addCategory(category) {
    //category.created = Date.now()
    await Category.create(category);
}

/**
 * 判断id是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isIdExist(id) {
    let c = await Category.findOne({_id: id});
    if(!c){
        throw Error(`id为【${id}】的分类不存在`)
    }
}

/**
 * 删除分类
 * @param id
 * @returns {Promise<void>}
 */
async function deleteCategory(id) {
    //判断id是否存在
    await isIdExist(id)
    let res = await Category.deleteOne({_id: id});
    if(res.n<1){
        throw Error("删除失败")
    }
}

async function updateCategory(id,update) {
    //判断id是否存在
    await isIdExist(id);
    //res:{n:1,nModify:1,ok:1}
    let res = await Category.updateOne({_id: id}, update);
    if(res.n<1){
        throw Error('更新失败')
    }
}

module.exports ={
    addCategory,
    deleteCategory,
    updateCategory,
    getCategorysByPage
}