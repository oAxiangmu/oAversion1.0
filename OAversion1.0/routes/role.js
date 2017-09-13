var express = require('express');
var router = express.Router();
var roleDao = require("../model/roleDao.js");
/* GET users listing. */
router.get('/list', function (req, res, next) {
    res.send('respond with a resource');
});
//角色创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    name = req.body.name;
    params.name=name;


    roleDao.isExesit(params, function (error, rows) {
        if (!rows) {
            data.result = 0;
            data.message = {
                res:"角色创建失败'",
               detail:"角色已经存在",
        };
            data.data=null;

        }
    });
    roleDao.add(name, function (error, result) {

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
});
//角色删除
router.get("/delet/:id", function (req, res, next) {
    var param={};
    var id=req.params.id;
    var data={};
    param.id=id;

    roleDao.isExesit(param, function (error, rows) {
        if (rows) {
            data.result = 0;
            data.message = {
                res:"角色删除失败'",
                detail:"角色不存在",
            };
            data.data=null;

        }
    });
    roleDao.delet(id,function (error,result) {
          if(error){
            data.result=0;
            data.message={
                result:"角色删除失败",
                detail:error,
            }

          }
          data.result=1;
          data.message={
              res:"角色删除成功",
              detail:""
          };
          data.data=null;
          res.json(data);

    })
});
//查找角色
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
   var page= req.params.page||1;
   var start=(page-1)*pageSize;
   params=[start,pageSize];
   roleDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "角色查询失败",
                 detail: error,
       };
             data.data=null;
       }

       data.result=1;
       data.message={
           res:"角色查询成功",
           detail:"",
       }
       data.data=result;
       res.json(data);

   })
});
module.exports = router;
