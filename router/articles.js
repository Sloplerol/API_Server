const express = require('express');
const router = express.Router();

const articleshandle = require('../router_handle/articles');

//导入multer模块
const multer = require('multer');
const path = require('path');

router.post('/add',articleshandle.add);

module.exports = router;