var express = require('express');
var router = express.Router();
var operationDao = require("../model/operationDao");

//业务创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    var name = req.body.name;
    var pid=req.body.pid||null;
    var url=req.body.url;
    params.name=name;


    operationDao.isExesit(params, function (error, rows) {
        if(error){
            data.result = 0;
            data.message = {result: "数据插入失败", detail: error};
            data.data = null;
            res.json(data);
            return;
        }

        if (rows.length>0) {
            data.result = 0;
            data.message = {
                res:"业务创建失败'",
               detail:"业务已经存在",
        };
            data.data=null;
            res.json(data);
            return;

        }else{
            operationDao.add([name,url,pid], function (error, result) {

                if (error) {
                    data.result = 0;
                    data.message = {result: "数据插入失败", detail: error};
                    data.data = null;
                    res.json(data);
                    return;
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
//业务删除
router.get("/delet/:id", function (req, res, next) {
    var param={};
    var id=req.params.id;
    var data={};
    param.id=id;

    operationDao.isExesit(param,function (error,result) {
        if(error){

            data.result=1;
            data.message={
                result:"删除失败！",
                detail:error,
            };
            data.data=null;
            res.json(data);
            return;
        }
        if(result.length<=0){
            data.result=1;
            data.message={
                result:"删除失败！",
                detail:"业务不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        operationDao.delet(id,function (error,result) {
            if(error){

                data.result=1;
                data.message={
                    result:"删除失败！",
                    detail:error,
                };
                data.data=null;
                res.json(data);
                return;
            }

            data.result=1;
            data.message={
                result:"删除成功！",
                detail:""
            };
            data.data=null;
            res.json(data);

        })
    })

});
//业务列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
   var page= req.params.page||1;
   var start=(page-1)*pageSize;

   params=[start,pageSize];
    operationDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "部门查询失败",
                 detail: error,
       };
             data.data=null;
             res.json(data);
             return;
       }

       data.result=1;
       data.message={
           res:"业务查询成功",
           detail:"",
       }
       data.data=result;
       res.json(data);

   })
});

//业务修改

router.post("/update", function (req, res, next) {
    var param={};
    var id=req.body.id;
    var name=req.body.name;
    var url=req.body.url;
    var pid=req.body.pid||null;


    var data={};
    param.id=id;

    operationDao.isExesit(param,function (error,result) {
        if(error){

            data.result=1;
            data.message={
                result:"修改失败！",
                detail:error,
            };
            data.data=null;
            res.json(data);
            return;
        }
        if(result.length){
            data.result=1;
            data.message={
                result:"业务修改失败！",
                detail:"业务不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        operationDao.update([name,url,pid],function (error,result) {
            if(error){
                data.result=1;
                data.message={
                    result:"修改失败！",
                    detail:error,
                };
                data.data=null;
                res.json(data);
                return;
            }

            data.result=1;
            data.message={
                result:"修改成功！",
                detail:"",
            };
            data.data=null;
            res.json(data);


        })
    })

});

module.exports = router;
