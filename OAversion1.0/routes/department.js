var express = require('express');
var router = express.Router();
var departmentDao = require("../model/departmentDao");


//部门创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    var name = req.body.name;
   var  remark=req.body.remark||null;
    var no=req.body.no;
    var pid=req.body.pid||null;
    var short=req.body.short||null;
    params.no=no;


    departmentDao.isExesit(params, function (error, rows) {

        if (rows.length>0) {
            data.result = 0;
            data.message = {
                res:"部门创建失败'",
               detail:"部门编号已经存在",
        };
            data.data=null;
            res.json(data);
            return;

        }else{
            departmentDao.add([name,no,pid,remark,short], function (error, result) {

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
//部门删除
router.get("/delet/:id", function (req, res, next) {
    var param={};
    var id=req.params.id;
    var data={};
    param.id=id;

    departmentDao.isExesit(param,function (error,result) {
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
                detail:"部门不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        departmentDao.delet(id,function (error,result) {
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
//部门列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
   var page= req.params.page||1;
   var start=(page-1)*pageSize;

   params=[start,pageSize];
    departmentDao.list(params,function (error,result) {
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
           res:"部门查询成功",
           detail:"",
       }
       data.data=result;
       res.json(data);

   })
});

//部门修改

router.post("/update", function (req, res, next) {
    var param={};
    var id=req.body.id;
    var name=req.body.name;
    var no=req.body.no;
    var remark=req.body.remark||null;
    var pid=req.body.pid||null;
    var short=req.body.short||null;

    var data={};
    param.id=id;

    departmentDao.isExesit(param,function (error,result) {
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
                result:"修改失败！",
                detail:"部门不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        departmentDao.update([name,no,pid,remark,short,id],function (error,result) {
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
                detail:""
            };
            data.data=null;
            res.json(data);


        })
    })

});

module.exports = router;
