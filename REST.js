var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

   

   router.post("/signup",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_info","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: signing up "});
            } else {
                res.json({"Success" : true,  "Message" : "User Added !"});
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