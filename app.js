const express = require('express');
const app = express();

// 内置中间件来解析请求的urlencoded数据类型的代码 一定要写前面
app.use(express.urlencoded({extended:false})); 

const joi = require('joi');


// 导入cors中间件 解决跨域问题
const cors = require('cors');
// 将cors中间件注册为全局可用的中间件
app.use(cors());

// 封装res.send函数简化处理函数代码
app.use((req,res,next)=>{
    res.cc = (err,status = 1)=>{
        res.send({
            status,
            //error 的值可能是错误对象 也可能是错误描述的字符串
            //判断错误是自己填写的字符类型还是系统错误类型
            msg: err instanceof Error ? err.message : err
            // Error是构造函数实例
        })
    }
    next();
})
//配置解析token字符串的中间件
const expressjwt = require('express-jwt');
const config = require('./config');
//unless path属性来指明哪些接口不需要身份认证
app.use(expressjwt({secret:config.jwtSecretKeys}).unless({path:[/^\/api/]}))

// 用户路由模块
const router = require('./router/user');
app.use('/api',router);
// 用户路由信息模块
const userinfoRouter = require('./router/userinfo');
app.use('/my',userinfoRouter);
 
// 导入并使用分类表单数据的路由模块
const artCates = require('./router/artcate');
app.use('/my/artcate',artCates)

//导入并使用文章表数据的路由模块
const articles = require('./router/articles');
app.use('/my/article',articles);

// 用来捕获错误的全局中间件
app.use((err,req,res,next)=>{
    // 验证错误导致的失败
    if(err instanceof joi.ValidationError) return res.cc(err) //需要写return返回否则两次会res.send两次
    //身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //未知的错误
    res.cc(err);
})


app.listen(80,()=>{
    console.log('端口已启动');
})