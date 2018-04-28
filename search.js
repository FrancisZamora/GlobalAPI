var mysql = require("mysql");
var express = require('express');
function REST_ROUTER(router,connection,md5,verifyToken,jwt) {
    var self = this;
    self.handleRoutes(router,connection,md5,verifyToken,jwt);
}
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5,verifyToken,jwt) {



    router.get("/searchTrainerCategory/:category_id",verifyToken, function(req,res) {
       jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
       var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 1;"
       var table = [ "users", "category_id",req.params.category_id];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
     });
    }
    });
   });





    router.get("/searchTrainers/:name",verifyToken, function(req,res) {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
       var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 1;"
       var table = [ "users", "name",req.params.name];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
     });
    }
    });
    });

    router.get("/searchTrainees/:name",verifyToken, function(req,res) {
       jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
       var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 0;"
       var table = [ "users", "name",req.params.name];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
     });
    }
    });
    });


    router.get("/profile/retrievelikes/:user_id",verifyToken, function(req,res) {
       jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
       var query = "SELECT ?? FROM ?? WHERE ?? = ?;"
       var table = ["liked", "users", "user_id",req.params.user_id];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
             });
         }
      });
    });

      router.post("/profile/like",verifyToken, function(req,res) {
       jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
       var query = "INSERT INTO ??(??) VALUES (?)"
       var table = ["users", "liked", req.body.user_id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
            });
        }
     });
    });


   router.post("/profile/dislike",verifyToken, function(req,res) {
     jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
       var query = "INSERT INTO ??(??) VALUES (?)"
       var table = ["users", "disliked", req.body.user_id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for disliking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
            });
        }
      });
     });








    
    




    router.get("/profile/retrieveuser/:user_id",verifyToken, function(req,res){
         jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
        var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 0";
        var table = ["users", "user_id", req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query for general users"});
            } else {
                res.json({"Success" : true,  "Message" : "Users",rows});
            }
        });
    }
    });
    });

    router.get("/profile/retrievetrainer/:user_id",verifyToken, function(req,res){
         jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {
        var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 1";
        var table = ["users", "user_id", req.params.user_id];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query for general users"});
            } else {
                res.json({"Success" : true,  "Message" : "Trainers",rows});
            }
        });
    }
    });
    });



}
module.exports = REST_ROUTER;












