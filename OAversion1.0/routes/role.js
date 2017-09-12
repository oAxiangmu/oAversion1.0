var express = require('express');
var router = express.Router();
var roleDao=require("../model/roleDao.js");

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/add",function(req,res,next){
	name=req.body.name;
	roleDao.add(name,function(error,result){
		var data={};
		if(error){
			data.result=0;
			data.message="数据插入失败";
			data.data=null;
			res.json(data);
				
		}else{
			data.result=1;
			data.message="数据插入成功";
			data.data=null;
			res.json(data);
		}
		
	});
});

module.exports = router;
