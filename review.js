var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {


       router.get("/reviews/getall/:reviewed_id",function(req,res){

        var query = "SELECT * FROM ?? WHERE ?? = ? ";
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


      router.post("/reviews/createreview",function(req,res){

        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["reviews","reviewer_id","reviewed_id","review_text","rating",req.body.reviewer_id,req.body.reviewed_id, req.body.text,req.body.rating];

      

        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Creating Review"});
            } else {
                res.json({"Success" : true,  "Message" : "Review Created"});
            }
        });
      });

    router.delete("/reviews/deletereview",function(req,res){

        var query = "DELETE FROM ?? WHERE ?? = ? ";
        var table = ["reviews","review_id",req.body.review_id];
      

        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Deleting Review"});
            } else {
                res.json({"Success" : true,  "Message" : "Review Deleted"});
            }
        });
      });







}

module.exports = REST_ROUTER;