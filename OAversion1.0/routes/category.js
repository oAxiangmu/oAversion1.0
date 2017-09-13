var express = require('express');
var router = express.Router();
var category = require("../model/categoryDao.js");
//新闻类别创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
   var  name = req.body.name;
  var   pid=req.body.pid||0;
  console.log(pid);
    params.name=name;

    category.isExesit(params, function (error, rows) {

        if (rows) {
            data.result = 0;
            data.message = {
                res:"类别创建失败'",
                detail:"类别已经存在",
            };
            data.data=null;
            res.json(data);
            return;

        }else{
            category.add([pid,name], function (error, result) {

                if (error) {
                    data.result = 0;
                    data.message = {result: "数据插入失败", detail: error};
                    data.data = null;


                }
                data.result = 1;
                data.message = {
                    result:"数据插入成功",
                    detail:"",
                };
                data.data = null;
                res.json(data);



            });
        }
    });

});
module.exports = router;