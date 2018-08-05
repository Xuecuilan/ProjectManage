const categoryService = require('../service/category');
const router = require("express").Router();

 router.get('/',async(req,res)=>{
    let categorys = await categoryService.getCategorysByPage(req.query.page);
    res.success(categorys)
});
 router.post('/',async(req,res)=>{
     let c = await categoryService.addCategory(req.body)
     res.success(c)
 });
 router.delete('/:id',async(req,res)=>{
     await categoryService.deleteCategory(req.params.id)
     res.success()
 });
 router.put('/:id',async(req,res)=>{
     await categoryService.updateCategory(req.params.id,req.body)
     res.success()
 })
module.exports = router