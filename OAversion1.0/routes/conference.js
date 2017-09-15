var express = require('express');
var router = express.Router();
var conferenceDao = require("../model/conferenceDao.js");


//角色创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    title = req.body.title;
    content=req.body.content;
    pusherId=req.body.pusherId;
    adress=req.body.adress;
    start=req.body.start;
    end=req.body.end;
    
    conferenceDao.add([title,content,pusherId,adress,start,end], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "会议发布失败", detail: error};
            data.data = null;
          res.json(data);
          return;

        } else {
            data.result = 1;
            data.message = {
                result:"会议发布成功",
                detail:"",
            };
            data.data = null;
            
        }
        res.json(data);
    
    })
});


//角色删除
router.get("/delet/:id", function (req, res, next) {
    var id=req.params.id;
    var data={};
    conferenceDao.delet(id,function (error,result) {
          if(error){
            data.result=0;
            data.message={
                result:"会议删除失败",
                detail:error,
            }
            res.json(data);
          }
          data.result=1;
          data.message={
              res:"会议删除成功",
              detail:""
          };
          data.data=null;
          res.json(data);
    })
});



//修改角色
router.post("/update/:id",function (req, res) {
	
	    var data={};
	    var params={};
	    title = req.body.title;
	    content=req.body.content;
	    pusherId=req.body.pusherId;
	    adress=req.body.adress;
	    start=req.body.start;
	    end=req.body.end;
	    id=req.body.id;
	    
	    conferenceDao.update([title,content,pusherId,adress,start,end,id], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "会议修改失败", detail: error};
            data.data = null;
          
            res.json(data);
            return
        } else {
            data.result = 1;
            data.message = {
                result:"会议修改成功",
                detail:"",
            };
            data.data = null;
            
        }
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
   conferenceDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "会议查询失败",
                 detail: error,
       };
           res.json(error);
           return;
       }

       data.result=1;
       data.message={
           res:"会议查询成功",
           detail:"data",
       }
       data.data=result;
       res.json(data);

   })
});


module.exports = router;
	
	
	
	
