const express = require('express');
// 创建路由对象
const router = express.Router();

const handle = require('../router_handle/user');

//导入验证数据的中间件
 const expressjoi = require('@escook/express-joi');
 //导入定义规则的数据对象
 const {schema_user} = require('../schema/user');

router.post('/reguser',expressjoi(schema_user),handle.reguser);

router.post('/load',expressjoi(schema_user),handle.load);

module.exports = router;