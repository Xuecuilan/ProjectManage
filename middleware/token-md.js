const crypto = require('lxj-crypto');
const config = require("../config");
 const userService = require('../service/user');
//用来判断当前用户是否是合法用户
//1.从header中取token，如果没有 直接拒绝
//2.如果有token  则校验token的正确性 如果解码解密失败  则直接拒绝
function isExcludeUrl(url) {
    let excludeUrls = [
        /.*\/user\/login/,
        /.*\/user\/register/,
    ]
    //遍历数据  看当前的url是否在其中
    let isExclude = false;
    excludeUrls.forEach(item=>{
        if(item.test(url)){
            isExclude = true
        }
    });
    return isExclude;
}
module.exports= (req,res,next)=>{
    //1.先判断当前的url是否需要token验证，登录和注册不需要token
    if(!isExcludeUrl(req.url)){
        //从header中取出token
        let token = req.get('token');
        if(!token){
            throw Error("缺少token ")
        }
        let tokenData;
        try {
            //2.对token进行解码，看是否是伪造的token
            tokenData = JSON.parse(crypto.aesDecrypt(token, config.TOkenKey));
            console.log(tokenData);
        } catch (e) {
            throw Error("token不合法")
        }
        //3.判断token是否过期
        if(tokenData.expire < Date.now()){
            throw Error("token已过期，请重新登录")
        }
        //4.可以根据tokenDate中的username取出用户信息，为了给后续的请求使用
       let userInfo = userService.getUserInfo(tokenData.username)
        //console.log(userInfo)
        res.user = userInfo;//给req对象安装一个userInfo变量 目的是给后面的中间件来用
    } 
    next();
};