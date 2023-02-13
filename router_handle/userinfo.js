const db = require('../db/index');
const bcrypt = require('bcryptjs');
//获取用户信息的处理函数
exports.getUserinfo = (req,res)=>{
    // 定义查询用户信息的sql语句 注意这里不要填写密码
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    // 调用db.query语句执行SQL语句
    db.query(sql,req.user.id,(err,results)=>{
        //因为身份认证成功 可以通过req.user获取用户信息
        if(err) return res.cc(err)
        // 当查询字符为空的时候执行下面的代码
        if(results.length!==1) return res.cc('获取身份信息失效')
        res.send({
            status: 0,
            msg: '获取用户信息成功',
            data: results[0]
        })
    })
}

//更新用户信息的基本处理函数 只能更新有的数据
exports.updateUserinfo = (req,res)=>{
    //定义待执行的SQL语句
    const sql = 'update ev_users set ? where id=?';
    // 调用query方法执行sql语句 当有两个参数的时候需要用方括号进行包裹
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        //执行SQL语句失败
        if(err) return res.cc(err);
        // 执行SQL语句成功但是更新数据影响行数不为1
        if(results.affectedRows!==1) return res.cc('用户信息更新失败');
        // 执行成功
        res.cc('更新成功',0);
    })
}

//更新用户密码的处理函数
exports.updatePwd = (req,res)=>{
    // 根据id查询用户信息
    const sql = 'select * from ev_users where id=?';
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.cc(err);
        if(results.length!==1) return res.cc('用户不存在');
        
        // 验证用户旧密码是否正确
        const comparesult = bcrypt.compareSync(req.body.oldpwd,results[0].password)
        if(!comparesult) return res.cc('旧密码错误');
        // 定义更新密码的sql语句
        const sql = 'update ev_users set password=? where id=?';
        // 对新密码进行加密
        const newpwd = bcrypt.hashSync(req.body.newpwd,10);
        // 定义query函数执行sql语句
        db.query(sql,[newpwd,req.user.id],(err,results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows!==1) return res.cc('更新密码失败')
            res.cc('更新密码成功',0);
        })
    })
}

//更新用户头像的处理函数
exports.updateAva = (req,res)=>{
    //定义更新用户头像的SQL数据
    const sql = 'update ev_users set user_pic=? where id=?';
    // query函数去执行SQL语句
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        // 执行SQL语句错误
        if(err) return res.cc(err)
        // 观察行数是否等于1
        if(results.affectedRows!==1) return res.cc('更新头像失败');
        res.cc('更新头像成功');
    })
    
}