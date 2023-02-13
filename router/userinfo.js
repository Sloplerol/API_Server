const express = require('express'); 
const router = express.Router();
const userinfohandle = require('../router_handle/userinfo');

//导入验证数据的中间件
const expressjoi = require('@escook/express-joi');
//导入要验证的数据的规则对象
const {updateUserinfo,updatePwd,updateAva} = require('../schema/user');

//挂载路由模块

// 获取用户基本信息的路由规则
router.get('/userinfo',userinfohandle.getUserinfo);
//更新用户基本信息的路由规则
router.post('/userinfo',expressjoi(updateUserinfo),userinfohandle.updateUserinfo);
//更新密码的路由
router.post('/updatepwd',expressjoi(updatePwd),userinfohandle.updatePwd); 
//更新头像的路由
router.post('/updateava',expressjoi(updateAva),userinfohandle.updateAva);

module.exports = router;