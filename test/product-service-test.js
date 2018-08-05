require('../db')
const productService = require('../service/product');
async function testAddProduct() {
    let products = [
        {
            name: "外星人T990",
            price: "19999.9",
            stock: 120,
            description: "这是一台性能超级强劲的电脑，打LOL，DOTA2，吃鸡都不在话下。",
            category: "5b46a7eeb0bf5a233ce5a1f0"
        },
        {
            name: "联想E450",
            price: "4000.1",
            stock: 1000,
            description: "这是一台适用于办公，影音，娱乐的电脑。",
            category: "5b46a7eeb0bf5a233ce5a1f0"
        },
        {
            name: "智能手电筒",
            price: "200",
            stock: 2000,
            description: "这是一个智能化的手电筒，能够感受白天黑夜，自动打开，还能自动发点。",
            category: "5b46a762dd1c8136b425f303"
        },
        {
            name: "海尔智能冰箱",
            price: "1000",
            stock: 800,
            description: "这是一个无噪音，省电，功率小的智能冰箱，支持远程控制。",
            category: "5b46a762dd1c8136b425f303"
        },
        {
            name: "韩国风长腿裤子",
            price: "300",
            stock: 1800,
            description: "这是一个来自于韩国著名设计师的作品，为年轻人量身定做的。",
            category: "5b46a7eeb0bf5a233ce5a1f2"
        },
    ]
   let p =  await productService.addProduct(products);
    console.log(p)
}
async function testgetProductByPage() {
    let list = await productService.getProductsByPage(0);
    console.log(list);
}
async function testDeleteProduct() {
    let id = '5b49bf6bc71c090948b6d381';
    await productService.deleteProduct(id);
}
async function testUpdateProduct() {
    let id = '5b49bf6bc71c090948b6d381';
    let res = await productService.updateProductById(id,{name:"玩具"});
    console.log(res);
}
async function testgetProductById() {
    let id = '5b49bf6bc71c090948b6d382';
   let res = productService.getProductById(id);
   console.log(res)
}
testgetProductById();