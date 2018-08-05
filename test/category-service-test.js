require('../db')
const categoryService = require('../service/category');

async function testAddCategory() {
    let categorys =[
        {name:'电脑'},
        {name:'家具'},
        {name:'服装'},
        {name:'美妆'},
        {name:'鞋子'},
        {name:'母婴'},
        {name:'零食'},
        {name:'水果'},
    ]
    let c =  await categoryService.addCategory(categorys);
    console.log(c);
}
async function testDeleteCategory() {
    await categoryService.deleteCategory('5b48ccfc75b28a021c8b8b07');
}
async function testUpdateCategory() {
    let res = categoryService.updateCategory("5b48ccfc75b28a021c8b8b08",{name:"玩具"})
    console.log(res)
}
testAddCategory();