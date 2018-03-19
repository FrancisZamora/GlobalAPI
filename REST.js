var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

   

   router.post("/signup",function(req,res){
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


   router.post("/login",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ? ";
        var table = ["users","user_email",req.body.email, req.body.password];
       
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Logging in"});
            } 
        
            
            else {
                switch (rows.length) {
                case rows.length < 1:
                    res.json({"Error" : true, "Message" : "Incorrect Password or Username"});
                    break;
                case rows.length == 1:
                    password = rows[0].user_password

                    if (password != req.body.password) { 
                        res.json({"Error": true, "Message"  :"Incorrect Password or Username"});
                    }
                    else if (password == req.body.password) {
                        res.json({"Success":true, "Message" : "Login Successful"});
                    }
                    break;
                }

            }
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