var mysql = require("mysql");
var express = require('express');
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {


router.get("/retrieveprofessionals2",function(req,res){
        var query = "SELECT * FROM ?? WHERE ROLE = 1 ";
        var table = ["users"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query for professionals"});
            } else {
                res.json({"Success" : true,  "Message" : "Professionals",rows});
            }
        });
    });
    router.get("/search/:category", function(req,res) {
        console.log("hello");
       var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 1;"
       var table = [ "users", "category",req.params.category];
            query = mysql.format(query,table);
            console.log(query);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
     });
    });


    router.get("/profile/retrievelikes/:user_id", function(req,res) {
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
    });

      router.post("/profile/like/:user_id", function(req,res) {
       var query = "INSERT INTO ??(??) VALUES (?)"
       var table = ["users", "liked", req.params.user_id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for liking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
            });
     });


   router.post("/profile/dislike/:user_id", function(req,res) {
       var query = "INSERT INTO ??(??) VALUES (?)"
       var table = ["users", "disliked", req.params.user_id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query for disliking profile"});
                } else {
                    res.json({"Success" : true,  "Message" : "Success",rows});
                }
            });
     });








    
    




    router.get("/profile/retrieveuser/:user_id",function(req,res){
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
    });

    router.get("/profile/retrievetrainer/:user_id",function(req,res){
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
    });



}
module.exports = REST_ROUTER;












