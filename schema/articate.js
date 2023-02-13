//导入定义规则模块
const joi  = require('joi');

// 定义验证规则对象
const name = joi.string().required();
const alias = joi.string().alphanum().required();

//id的校验规则
const id = joi.number().integer().min(1).required();



//向外共享验证规则对象
exports.addarticate = {
    body: {
        name,
        alias
    }
}
//根据id删除数据表的验证规则对象
exports.delartcate = {
    params: {
        id
    }
}

// 根据id获取相应数据的规则对象
exports.getartcate = {
    params: {
        id
    }
}

//更新分类数据的验证规则对象
exports.updatecate = {
    body: {
        id,
        name,
        alias
    }
}
