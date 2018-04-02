var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

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


    router.get("/profile/retrieveuser",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 0";
        var table = ["users", "user_id", req.body.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query for general users"});
            } else {
                res.json({"Success" : true,  "Message" : "Users",rows});
            }
        });
    });

    router.get("/profile/my",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["users", "user_id", req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query for general users"});
            } else {
                res.json({"Success" : true,  "Message" : "Trainers",rows});
            }
        });
    });

    router.post("/profile/avatar",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["users", "user_id", req.body.user_id];
        query = mysql.format(query,table);
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