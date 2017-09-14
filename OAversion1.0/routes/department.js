var express = require('express');
var router = express.Router();
var departmentDao = require("../model/departmentDao.js");




//角色创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    name = req.body.name;
    no=req.body.no;
    params.name=name;

    departmentDao.add([name,no,id], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "数据插入失败", detail: error};
            data.data = null;
          res.json(data);
          return;

        } else {
            data.result = 1;
            data.message = {
                result:"数据插入成功",
                detail:"",
            };
            data.data = null;
            
        }
        res.json(data);

    });
});
//角色删除
router.get("/delet/:id", function (req, res, next) {
    var id=req.params.id;
    var data={};
    departmentDao.delet(id,function (error,result) {
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
   departmentDao.list(params,function (error,result) {
       if(error){
             data.result=0;
             data.message= {
                 res: "角色查询失败",
                 detail: error,
       };
           res.json(error);
           return;
       }

       data.result=1;
       data.message={
           res:"角色查询成功",
           detail:"data",
       }
       data.data=result;
       res.json(data);

   })
});
module.exports = router;


//修改角色
router.post("/update/:id",function (req, res) {
	
	    var data={};
	    var params={};
	    name = req.body.name;
	    no=req.body.no;
	    id=req.body.id;
	    params.name=name;
	    
    departmentDao.update([name,no,id], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "数据修改失败", detail: error};
            data.data = null;
          
            res.json(data);
            return
        } else {
            data.result = 1;
            data.message = {
                result:"数据修改成功",
                detail:"",
            };
            data.data = null;
            
        }
        res.json(data);

    });
});

module.exports = router;
	
	
	
	
	
	
	
