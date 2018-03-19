var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

   

   router.post("/account/register",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["users","user_email","user_password","phone","name","role",req.body.email,req.body.password, req.body.phone,req.body.name,req.body.role];
        if (req.body.role == 'client') {
            req.body.role = 0;
        }
        else {
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


   router.post("/account/login",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ? ";
        var table = ["users","user_email",req.body.email, req.body.password];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                if (rows.length < 1){
                    res.json({"Error" : true, "Message" : "Incorrect Password or Username"});
                }
                else {
                password = rows[0].user_password

                if (password != req.body.password) { 
                    res.json({"Error": true, "Message"  :"Incorrect Password or Username"});
                }
                else if (password == req.body.password) {
                    res.json({"Success":true, "Message" : "Login Successful"});
                }
            }

            }

            
        });
    });

   router.put("/updatepassword",function(req,res){
       var query = "UPDATE ?? SET ?? = ?";
 
        var table = ["users","user_password", req.body.password];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });

    router.put("/updatepassword",function(req,res){
       var query = "UPDATE ?? SET ?? = ?";
 
        var table = ["users","user_password", req.body.password];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });


   router.put("/updatephone",function(req,res){
       var query = "UPDATE ?? SET ?? = ?";
 
        var table = ["users","phone", req.body.phone];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });

      router.put("/updateemail",function(req,res){
       var query = "UPDATE ?? SET ?? = ?";
 
        var table = ["users","user_email", req.body.email];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });

    router.put("/account/apply",function(req,res){
       var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?  ";
 
        var table = ["users","pending_approval", "user_email", req.body.request,req.body.email];
        if (req.body.request == "true") {
            req.body.request = 1;
        }
        else if (req.body.request == "false") {
            
                req.body.request = 0; 
            
        }
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });


    router.put("/administrator/approve",function(req,res){
       var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?  ";
 
        var table = ["users","approved", "user_email", req.body.request,req.body.email];
        if (req.body.request == "true") {
            req.body.request = 1;
        }
        else if (req.body.request == "false") {
            
            req.body.request = 0; 
            
        }
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });



   



    router.get("/retrieveprofessionals",function(req,res){
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

      router.get("/retrievegeneralusers",function(req,res){
        var query = "SELECT * FROM ?? WHERE ROLE = 0";
        var table = ["users"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query for general users"});
            } else {
                res.json({"Success" : true,  "Message" : "Users",rows});
            }
        });
    });











}

module.exports = REST_ROUTER;