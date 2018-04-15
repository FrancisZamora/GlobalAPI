var mysql = require("mysql");
var express = require('express');
var bcrypt = require('bcryptjs');

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {


   router.post("/account/register",function(req,res){

        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        bcrypt.hash(req.body.password,10, function(err,hash) {
        req.body.password = hash;
        console.log(hash);
        var table = ["users","user_email","user_password","phone","name","role",req.body.email,req.body.password, req.body.phone,req.body.name,req.body.role];
        if (req.body.role == 'trainer') {
            req.body.role = 0;
        }
        else if (req.body.role == 'trainee') {
            req.body.role = 1;
        }

        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: signing up "});
            } else {
                res.json({"Success" : true,  "Message" : "User Added !"});
            }
        });
      });


    });



    
   router.post("/account/login",function(req,resp){
        var query = "SELECT ?? FROM ?? WHERE ?? = ? ";
        var table = ["user_password", "users","user_email",req.body.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            console.log(rows);
            if(err) {
                resp.json({"Error" : true, "Message" : "Error Logging in"});
            } 

            bcrypt.compare(req.body.password,rows[0].user_password, function(err, res) {
                console.log(res);
                if (res) {
                    resp.json({"Success":true,"message" : "Login successful"});
                   // res.json({"Success":true, "Message" : "Login Successful"});

                }
                else {
                    resp.json({"Error": true, "Message"  :"Incorrect Password or Username"});

                }
         

            
             });
           });
        });
   

   

   router.put("/account/updatepassword",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
        var table = ["users","user_password", md5(req.body.newpassword),"user_email",req.body.email,"user_password",md5(req.body.oldpassword)];
       
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Changing Password"});
            } 
        
            
            else {
                
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });

  


   router.put("/account/updatephone",function(req,res){
       var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
 
        var table = ["users","phone", req.body.phone,"user_email",req.body.email];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Updating Phone"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Phone number changed Changed Successfully"});


            }

            
        });
    });

      router.put("/account/updateemail",function(req,res){
       var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? ";
 
        var table = ["users","user_email", req.body.email, "user_email",req.body.email];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Updating Email"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Email Updated Successfully"});


            }

            
        });
    });

    router.put("/account/apply",function(req,res){
       var query = "UPDATE ?? SET ?? = ?    WHERE ?? = ?  ";
 
        var table = ["users","pending_approval", "role", "user_email", req.body.request, req.body.email];
        if (req.body.request == "true") {
            req.body.request = 1;
        }
        else if (req.body.request == "false") {
                req.body.request = 0; 
            
        }
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error occurred while applying to be a trainer"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Applied to be a trainer!" });


            }

            
        });
    });









}
module.exports = REST_ROUTER;












