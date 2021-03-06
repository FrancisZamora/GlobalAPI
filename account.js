var mysql = require("mysql");
var express = require('express');
var bcrypt = require('bcryptjs');
var request = require('request');
var link = (process.env.PORT != null)?("http://globaljoy.herokuapp.com/api/login"):("http://localhost:3000/api/account/verifylogin")
function REST_ROUTER(router,connection,md5,verifyToken,jwt) {
    var self = this;
    self.handleRoutes(router,connection,md5,verifyToken,jwt);
}
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5,verifyToken,jwt) {


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


  router.post('/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
       console.log(req.token);

      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});




    
   router.post("/account/login",function(req,resp){
        var query = "SELECT * FROM ?? WHERE ?? = ? ";
        var table = [ "users","user_email",req.body.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                resp.json({"Error" : true, "Message" : "Error Logging in"});
            } 

            bcrypt.compare(req.body.password,rows[0].user_password, function(err, res) {
           
                if (res) {
                    const user = {
                id:rows[0].user_id,
                email:rows[0].user_email

                 }

            jwt.sign({user}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
             resp.json({
                 token
             });
             });
  
         }
                else {
                    resp.json({"Error": true, "Message"  :"Incorrect Password or Username"});

                }

         

            
             });
           });
        });

    router.post("/account/verifylogin",function(req,resp){
        var query = "SELECT * FROM ?? WHERE ?? = ? ";
        var table = [ "users","user_email",req.body.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
              console.log('no');
                resp.json({"Error" : true, "Message" : "Error Logging in"});
            } 

            bcrypt.compare(req.body.password,rows[0].user_password, function(err, res) {
           
                if (res) {
              resp.json("T");
  
         }
                else {
                    resp.json("F");

                }

         

            
             });
           });
        });




   

   

   router.put("/account/updatepassword",verifyToken,function(req,res){
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
      
      else {

      if (req.body.oldpassword == req.body.newpassword) {
          res.json({"Error:":true, "Message":"New Password cannot be the same as the old password"})
      }
      else {
      request.post({url:link, form: {email:req.body.email,password:req.body.oldpassword}}, function(err,httpResponse,body){

        if (body[1] == "T"){

          var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
          bcrypt.hash(req.body.newpassword,10, function(err,hash) {
          req.body.newpassword = hash;
          
          var table = ["users","user_password", (req.body.newpassword),"user_email",req.body.email];
          console.log(query);
          query = mysql.format(query,table);
          console.log(query);
          connection.query(query,function(err,rows){

              if(err) {
                  res.json({"Error" : true, "Message" : "Error Changing Password"});
              }     
              else {
                console.log(rows);
                  if (rows.affectedRows == 0) {
                    res.json({"Error:":true, "Message":"Passwords did not match"})
                  }
                  else {
                  res.json({"Success" : true,  "Message" : rows.affectedRows});
                }
              }
            });
          
          });
              
          }
          else {
            res.json({"Error:":true, "Message":"Passwords did not match"})
          }
      
           });
         }
        }
    });
  });

    






  


   router.put("/account/updatephone",verifyToken, function(req,res){
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
                  res.sendStatus(403);

        }

        else {
        
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









