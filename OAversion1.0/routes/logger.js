var express = require('express');
var router = express.Router();
var logerDao = require("../model/loogerDao.js");



//发布日志
router.post("/add", function (req,res,next) {
    var data = {};//返回的数据

   var   title = req.body.title;
   var  content=req.body.content;
   var sendId=req.body.sendId;
   var  recId=req.body.recId;

    logerDao.add([title,content,sendId,recId], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "日志发布失败", detail: error};
            data.data = null;

            res.json(data);
            return
        }

               data.result = 1;
               data.message = {
                   result: "日志发布成功",
                   detail: "",
               };
               data.data = null;

              res.json(data);


    });
});

/*
//日志删除
router.get("/delet/:id", function (req, res, next) {
   var id=req.params.id;
   var data={};
    logerDao.isExesit(id,function (error,result) {
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
         if(!result.length){
             data.result=1;
             data.message={
                 result:"删除失败！",
                 detail:"日志不存在"
             };
             data.data=null;
             res.json(data);
             return;

         }
        logerDao.delet(id,function (error,result) {
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

//日志列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
   var page= req.params.page||1;
   var start=(page-1)*pageSize;
   params=[start,pageSize];
    logerDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "日志查询失败",
                 detail: error,
       };
             data.data=null;
             res.json(data);
             return
       }

       data.result=1;
       data.message={
           res:"日志查询成功",
           detail:"",
       }
       data.data=result;
       res.json(data);

   })
});
//查看单条新闻
router.get("/view/:id",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
    var id= req.params.id;


    logerDao.view(id,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "日志查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"日志查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});*/
module.exports = router;
