var express = require('express');
var router = express.Router();
var conferenceDao = require("../model/conferenceDao.js");


//会议创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据

    title = req.body.title;
    content=req.body.content;
    pusherId=req.body.pusherId;
    uId=req.body.uId;
    address=req.body.address;
    start=req.body.start;
    end=req.body.end;
    
    conferenceDao.add([title,content,pusherId,address,start,end,uId], function (error, result) {

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
//会议删除
router.get("/delet/:id", function (req, res, next) {
    var id=req.params.id;
    var data={};
    conferenceDao.isExesit(id,function (error,result) {
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
                detail:"会议不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        conferenceDao.delet(id,function (error,result) {
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
//会议列表

router.get("/list/:page",function (req,res,next) {

    var data={};
    pageSize=10;
    var page= req.params.page||1;
    start=(page-1)*  pageSize;

    conferenceDao.list([start,pageSize],function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "会议查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"会议查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看会议
var data={};
var id= req.params.id;


conferenceDao.view(id,function (error,result) {
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




module.exports = router;
	
	
	
	
