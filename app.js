//引入db
require('./db');

//引入异常捕获处理  放到最前面引入
require('express-async-errors');
let config = require('./config');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let express = require('express');
const app = express();
//注册日志中间件
app.use(morgan('combined'));
//注册body-parser中间件
app.use(bodyParser.json());//调用json方法
//注册中间件  必须放在路由上面
app.use(require('./middleware/res_md'));
app.use(require('./middleware/token-md'));
app.use(require('./middleware/permission-md'));

//注册路由
app.use("/user",require('./router/user'));
app.use("/category", require('./router/category'));
app.use("/product", require('./router/product'));
app.use("/order", require('./router/order'));

//注册异常处理中间件
app.use((err,req,res,next)=>{
    res.fail(err.toString());
})

//启动
app.listen(config.PORT);