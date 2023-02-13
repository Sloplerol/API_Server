//路由处理函数模块
const db = require('../db/index');

//获取文章分类列表的处理函数
exports.getartcate = (req,res)=>{
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';
    db.query(sql,(err,results)=>{
        if(err) return res.cc(err);
        res.send({
            status:0,
            msg: '获取文章信息成功',
            data: results
        })
    })
}


//新增文章分类的处理函数
exports.addartcate = (req,res)=>{
    // 定义查重的SQL语句
    const sql = 'select * from ev_article_cate where name=? or alias=?';
    // query函数执行SQL语句
    db.query(sql,[req.body.name,req.body.alias],(err,results)=>{
        // SQL语句执行错误
        if(err) return res.cc(err)
        //验证名字和别名是否重复
        // 对角线分类和别名同时被占用
        if(results.length===2) return res.cc('别名和名字同时被占用');
        // 长度的1的三种可能
        if(results.length===1 && results[0].name===req.body.name && results[0].alias===req.body.alias) {
            return res.cc('名字和别名同时被占用');
        }
        if(results.length===1 && results[0].name===req.body.name) {
            return res.cc('名字被占用');
        }
        if(results.length===1 && results[0].alias === req.body.alias) {
            return res.cc('别名被占用');
        }

        //定义插入文章分类的SQL语句
        const sql = 'insert into ev_article_cate set ?';
        // 因为用了set?的形式所以插入值是一个整体req.body
        db.query(sql,req.body,(err,results)=>{
            if(err) return res.cc(err);
            if(results.affectedRows!==1) return res.cc('插入失败');
            res.cc('插入成功',0);
        })
    })
    
}


//删除文章分类的处理函数
exports.delartcate = (req,res)=>{
    // 利用标记删除的方法比直接删除更加安全
    const sql = 'update ev_article_cate set is_delete=1 where id=?';
    db.query(sql,req.params.id,(err,results)=>{
        //一定要用params因为id是动态的
        if(err) return res.cc(err);
        if(results.affectedRows!==1) return res.cc('删除失败')
        res.cc('删除成功',0);
    })
}


//获取id文章分类的处理函数
exports.getartcateByid = (req,res)=>{
    const sql = 'select * from ev_article_cate where id=?';
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1) return res.cc('未找到相关数据');
        res.send({
            status:0,
            msg:'获取数据成功',
            data: results[0]
        })
    })
}



//更新文章数分类数据的处理函数
exports.updatecate = (req,res)=>{
    // 定义查询更新的SQL语句的结果是否与别人重复 
    const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)';
    db.query(sql,[req.body.id,req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.cc(err)
        if(results.length===2) return res.cc('名称和别名都被占用了')
        if(results.length===1 && results[0].name===req.body.name && results[0].alias===req.body.alias) return res.cc('名称和别名都被占用了')
        if(results.length===1 && results[0].alias===req.body.alias) return res.cc('别名被占用了')
        if(results.length===1 && results[0].name===req.body.name) return res.cc('名字被占用了');
        //定义更新分类数据的SQL语句
        const sql = 'update ev_article_cate set ? where id=?';
        db.query(sql,[req.body,req.body.id],(err,results)=>{
            if(err) res.cc(err)
            if(results.affectedRows!==1) return res.cc('更新数据失败');
            res.cc('更新数据成功',0);
        })
    })
}