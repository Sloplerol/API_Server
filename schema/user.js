//定义规则模块
const joi = require('joi');

//分别定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

//定义id nickname email验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 定义头像的规则 dataUri表示值必须是base64字符串
const avatar = joi.string().dataUri().required();

// 向外暴露验证表单数据的规则对象
exports.schema_user = {
    body: {
        username,
        password,
    }
}
//更新用户信息的基本验证规则对象
exports.updateUserinfo = {
    body: {
        //当验证规则和表单数据相同时可以简写
        id,
        nickname,
        email
    }
}

//更新密码的规则对象
exports.updatePwd = {
    body: {
        oldpwd: password,
        // joi.ref代表新密码的值需要和旧密码一致 joi.not代表新密码的值和括号内的值不能相等 concat合并规则
        newpwd: joi.not(joi.ref('oldpwd')).concat(password)
    }
}

//更新头像的规则对象
exports.updateAva = {
    body: {
        avatar
    }
}