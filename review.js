var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

	   router.post("/message/createchat",function(req,res){

        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["chatroom","min_id","max_id","subject",req.body.min_id,req.body.max_id, req.body.subject];
      

        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Creating Chat"});
            } else {
                res.json({"Success" : true,  "Message" : "Chat Created!"});
            }
        });
      });

       router.get("/reviews/rating/:reviewed_id",function(req,res){

        var query = "SELECT ?? FROM ?? WHERE ?? = ? ";
        var table = ["rating","reviews ",req.params.reviewed_id];


        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Retreiving Rating"});
            } else {
                res.json({"Success" : true,  "Message" : "Rating Retrieved"});
            }
        });
      });







}

module.exports = REST_ROUTER;