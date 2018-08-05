require('../db')
let userService = require('../service/user')

async function testRegisterUser() {
    let user = {
        username :"ldh",
        password:'123456',
        age :10,
        role:1000
    };
    let res = await userService.registerUser(user)
    console.log(res);
}
async function testgetUserInfo() {
    let res = await userService.getUserInfo("llj");
    console.log(res);
}
async function testdeleteUser() {
    await userService.deleteUser("llj");//删除没有返回值 不需要接收
}
async function testloginUser() {
    let user ={
        username:'ldh',
        password:'123456'
    }
    let res = await userService.loginUser(user)
    console.log(res);
}

testloginUser();