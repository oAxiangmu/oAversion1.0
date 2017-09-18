var express = require('express');
var router = express.Router();
var userDao=require('../model/userDao');
var crypto=require("crypto");




//用户列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
    var page= req.params.page||1;
    var start=(page-1)*pageSize;

    params=[start,pageSize];
    userDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "用户查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return;
        }

        data.result=1;
        data.message={
            res:"用户查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//新建用户

router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    var name = req.body.name;
    var gender=req.body.gender;
    var no=req.body.no;
    var letter=req.body.letter;
    var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
          md5.update(req.body.password);
    var password=md5.digest('hex');

    var rolId=req.body.rolId;
    var duId=req.body.duId;
    var depId=req.body.depId;
    var email=req.body.email;
    var avatar=req.body.avatar||null;
    var  homecity=req.body.homecity;
    var mobileTel=req.body.mobileTel;
    var officeTel=req.body.req.offcieTel||null;


    params.no=no;


    userDao.isExesit(params, function (error, rows) {
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
                res:"用户创建失败'",
                detail:"用户编号已经存在",
            };
            data.data=null;
            res.json(data);
            return;

        }else{
            userDao.add([name,gender,no,letter,password,rolId,duId,depId,email,avatar,homecity,mobileTel,officeTel], function (error, result) {

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
//用户登录验证
router.post("/login",function (req,res,next) {
  var data={};//返回数据
  var name=req.body.name;
  var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
        md5.update(req.body.password);
    var password=md5.digest('hex');
  userDao.loginValidate([name,password],function (err,result) {

      if (error) {
          data.result = 0;
          data.message = {result: "登录失败", detail: error};
          data.data = null;
          res.json(data);
          return;
      }
      if(result.length==1){
          data.result=1;
          data.message={
              res:"登录成功",
              detail:"",
          }
          data.data='';
          res.json(data);
          return
      }
      if(result.length<=0){
          data.result=0;
          data.message={
              res:"登录失败",
              detail:"账号或密码不正确",
          }
          data.data='';
          res.json(data);
          return
      }
  })

});
//查看用户
router.get("/view/:id",function (req,res,next) {
    var data = {};
    var params={};
          params.id = req.params.id;

    userDao.view(params, function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {
                res: "用户查询失败",
                detail: error,
            };
            data.data = null;
            res.json(data);
            return
        }

        data.result = 1;
        data.message = {
            res: "用户查询成功",
            detail: "",
        }
        data.data = result;
        res.json(data);

    })
});


module.exports = router;
