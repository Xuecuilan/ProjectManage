//负责检查当前用户的role,是否有操作当前用户的权限
//将每种角色和它有权限操作的url进行一个映射 根据当前用户的role去判断他对应的权限即可
//具体如下：
//1.管理员所有接口都可以调用
//2.商家用户能全部调用：商品相关 订单相关 商品分类相关
//账户相关：只能调用登录和注册
const role_permissions =[
    //商家角色  和它对应的正则
    {
        role:0,
        permission:[
            /.*\/product.*/,
            /.*\/order.*/,
            /.*\/category.*/
        ]
    },
    //管理员角色，和它对应的正则
    {
        role:100,
        permission:[
            //正则表达式/.*/匹配不到回车换行  其他都可以匹配
            /.*/
        ]
    }
];
module.exports = (req,res,next)=> {
     //对req.user对象不为空的才进行检查
    if(req.user){
        let isGo = false;
        //取出user的role,然后遍历数组，判断对应的role的权限是否包含当前请求的Url
        role_permissions.forEach(obj =>{
            if(res.user.role ===obj.role){
                //则遍历当前obj的permissions,看看是否能够访问req.url
                obj.permission.forEach(p=>{
                    if(p.test(req.url)){ //说明能够访问req.url
                        isGo = true;
                    }
                });
            }
        });
        //当循环结束后 如果isGo还是false 说明权限不够
        if(!isGo){
            throw Error("当前用户权限不够")
        }
    }
   next()
};