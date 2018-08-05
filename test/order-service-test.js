require('../db')
const OrderService = require('../service/order');
async function testAddOrder() {
    let orders = [
        {
            "productId":"5b49bf6bc71c090948b6d382",
            "productName":"联想E450",
            "productPrice":"4000.1",
            "count" :"20"
        },
        {
            "productId":"5b49bf6bc71c090948b6d383",
            "productName":"智能手电筒",
            "productPrice":"200",
            "count" :"20"
        },
        {
            "productId":"5b49bf6bc71c090948b6d384",
            "productName":"海尔智能冰箱",
            "productPrice":"1000",
            "count" :"250"
        }

    ]
   const list = await OrderService.addOrder(orders);
    console.log(list);
}