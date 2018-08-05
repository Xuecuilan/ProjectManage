const router = require('express').Router();
const orderService = require('../service/order');

router.get("/",async(req,res,next)=>{
    let page = req.query.page
    let orders = await orderService.getOrdersByPage(page)
    res.success(orders)
});

router.get("/:id",async(req,res,next)=>{
    res.success(await orderService.getOrderById(req.params.id))
});

router.post("/",async(req,res,next)=>{
    let order = await orderService.addOrder(req.body)
    res.success(order)
});

module.exports = router;

