var mysql = require("mysql");
function REST_ROUTER(router,connection,md5,verifyToken,jwt) {
    var self = this;
    self.handleRoutes(router,connection,md5,verifyToken,jwt);
}
REST_ROUTER.prototype.handleRoutes= function(router,connection,md5,verifyToken,jwt) {

	   router.post("/message/createchat",function(req,res){
        jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
        else {
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
        }
      });
    });

	   router.post("/message/sendmessage",function(req,res){
          jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
          res.sendStatus(403);
        }
        else {
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["messages","id","message",req.body.id,req.body.message];
      

        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Sending Message"});
            } else {
                res.json({"Success" : true,  "Message" : "Chat Created!"});
            }
        });
        }
      });
    });





}

module.exports = REST_ROUTER;