const router = require('express').Router();
const productService = require('../service/product');

router.get("/",async(req,res,next)=>{
    const page = req.query.page;
    const products = await productService.getProductsByPage(page);
    res.success(products)
});
router.post('/',async(req,res,next)=>{
    await productService.addProduct(req.body)
    res.success()
});
router.put("/:id",async(req,res,next)=>{
    await productService.updateProductById(req.params.id,req.body)
    res.success()
});
router.delete("/:id",async(req,res,next)=>{
    await productService.deleteProduct(req.params.id)
    res.success()
});

module.exports =router;
