var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

   


    router.put("/administrator/approve",function(req,res){
       var query = "UPDATE ?? SET ?? = ?  WHERE ?? = ?  ";
 
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
                res.json({"Error" : true, "Message" : "Error Approving User"});
            } 
        
            
            else {
                res.json({"Success" : true,  "Message" : "User Approved to Trainer"});


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

    router.get("/profile/retrievetrainer",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ? AND ROLE = 1";
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