const bcrypt = require('bcryptjs');
const db = require('../db/index');
const jwt = require('jsonwebtoken');
const config = require('../config');
// 注册路由模块制作
exports.reguser = (req,res)=>{
    const userinfo = req.body;
    if(!userinfo.username||!userinfo.password) {
        return res.send({status:1,msg:'用户名或密码不能为空'});
    }
    const sql = 'select * from ev_users where username=?';
    db.query(sql,userinfo.username,(err,results)=>{
        if(err){
            // return res.send({status:1,msg:err.message});
            return res.cc(err);
        }
        // results得到的是一个数组
        if(results.length>0){
            // return res.send({status:1,msg:'用户名重复'});
            return res.cc('用户名重复');
        }
        // 调用hashSync对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10);
        console.log(userinfo);
        // 插入新用户
        const nsql = 'insert into ev_users set ?';
        db.query(nsql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if (err) {
                // return res.send({status:1,msg:err.message});
                return res.cc(err);
            }else if (results.affectedRows!==1) {
                // return res.send({status:1,msg:'注册用户失败'});
                return res.cc('注册用户失败');
            }else {
                // return res.send({status:0,msg:'注册成功'});
                return res.cc('注册成功',0);
                
            }
        })
    })
    // res.send不能在一次请求内多起响应
    // res.send('reguser ok');
}
// 登陆路由模块制作
exports.load = (req,res)=>{
    const userinfo = req.body;
    const sql = 'select * from ev_users where username=?';
    // 验证username是否一致
    db.query(sql,userinfo.username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1) return res.cc('登陆失败')
        //通过compareSync判断密码是否一致
        // 第一个参数是上传的密码第二个是数据库加密的密码
        const comparesult = bcrypt.compareSync(userinfo.password,results[0].password);
        if (!comparesult) {
            return res.cc('登陆失败')
        }
        // const user = {...results};
        // console.log(user);//打印的是数据库里关于该用户的所有信息
        // 剔除用户的信息
        const user = {...results[0],password:'',email:''};
        // console.log(user);
        // 获取token值
        const token = jwt.sign(user,config.jwtSecretKeys,{expiresIn: config.expiresIn});
        // 将token值返回给客户端
        res.send({
            status:0,
            msg: '登陆成功',
            //Bearer后面必须要加空格
            token: 'Bearer '+token
            //加上Bearer前缀方便用户身份认证
        })
    })
    
}