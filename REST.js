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



   




   
  


















}

module.exports = REST_ROUTER;