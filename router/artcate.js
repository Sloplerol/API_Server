const express = require('express');

const router = express.Router();
const artcatehandle = require('../router_handle/articate');

//导入验证规则的中间件
const expressjoi = require('@escook/express-joi');
//导入需要验证规则的对象
const {addarticate,delartcate,getartcate,updatecate} = require('../schema/articate');

//获取文章分类列表数据的路由
router.get('/cates',artcatehandle.getartcate);


//新增文章类型的路由
router.post('/cates',expressjoi(addarticate),artcatehandle.addartcate);


//根据id删除文章类型的路由
router.get('/delcates/:id',expressjoi(delartcate),artcatehandle.delartcate)


//根据id获取文章分类的路由
router.get('/cates/:id',expressjoi(getartcate),artcatehandle.getartcateByid);


//更新文章分类数据路由
router.post('/updatecates',expressjoi(updatecate),artcatehandle.updatecate);


module.exports = router;