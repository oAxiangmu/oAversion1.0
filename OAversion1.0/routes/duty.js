var express = require('express');
var router = express.Router();
var dutyDao = require("../model/dutyDao.js");


//职位创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    name = req.body.name;
    no=req.body.no;
    params.no=no;


    dutyDao.isExesit(params, function (error, rows) {

        if (rows.length>0) {
            data.result = 0;
            data.message = {
                res:"职位创建失败'",
               detail:"编号已经存在",
        };
            data.data=null;
            res.json(data);
            return;

        }else{
            dutyDao.add([name,no],function (error, result) {

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
//职位删除
router.get("/delet/:id", function (req, res, next) {
    var param={};
    var id=req.params.id;
    var data={};
    param.id=id;

    dutyDao.isExesit(param,function (error,result) {
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
                detail:"职位不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        dutyDao.delet(id,function (error,result) {
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
//查找角色
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
   var page= req.params.page||1;
   var start=(page-1)*pageSize;
   params=[start,pageSize];
    dutyDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "职位查询失败",
                 detail: error,
       };
             data.data=null;
             res.json(data);
             return;
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

//职位修改

router.post("/update", function (req, res, next) {
    var param={};
    var id=req.body.id;
    var name=req.body.name;
    var no=req.body.no;
    var data={};
    param.id=id;

    dutyDao.isExesit(param,function (error,result) {
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
        if(result.length<=0){
            data.result=1;
            data.message={
                result:"修改失败！",
                detail:"角色不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        dutyDao.update([name,no,id],function (error,result) {
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
