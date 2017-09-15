var express = require('express');
var router = express.Router();
var newsDao = require("../model/newsDao.js");
var async=require("async");


//新闻创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
   var   title = req.body.title;
   var  content=req.body.content;
   var cateId=req.body.cateId;
   var  author=req.body.author;

    newsDao.add([title,content,cateId,author], function (error, result) {


        if (error) {
            data.result = 0;
            data.message = {result: "新闻插入失败", detail: error};
            data.data = null;

            res.json(data);
            return
        }

               data.result = 1;
               data.message = {
                   result: "新闻插入成功",
                   detail: "",
               };
               data.data = null;

              res.json(data);


    });
});


//新闻删除
router.get("/delet/:id", function (req, res, next) {
   var id=req.params.id;
   var data={};
   newsDao.isExesit(id,function (error,result) {
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
                 detail:"新闻不存在"
             };
             data.data=null;
             res.json(data);
             return;

         }
         newsDao.delet(id,function (error,result) {
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

//新闻列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
   var page= req.params.page||1;
   var start=(page-1)*pageSize;
   params=[start,pageSize];
    newsDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "新闻查询失败",
                 detail: error,
       };
             data.data=null;
             res.json(data);
             return
       }

       data.result=1;
       data.message={
           res:"新闻查询成功",
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


    newsDao.view(id,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "新闻查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"新闻查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
module.exports = router;
