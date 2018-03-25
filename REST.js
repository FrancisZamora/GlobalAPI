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

    router.post("/account/trainersurvey",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var table = ["userInfo","user_id", "full_name","gender","birthday","personal_website","degrees","years_of_experience","practice_challenges","number_of_clients","days_per_week","hours_per_week","remote_coaching","favorite_place_world","favorite_place_us","favorite_hobby","healthy_tip","favorite_book",req.body.user_id,req.body.name,req.body.gender,req.body.birthday,req.body.personal_website,req.body.degrees,req.body.years_of_experience,req.body.challenges,req.body.number_of_clients,req.body.days_per_week,req.body.hours_per_week,req.body.remote_coaching,req.body.favorite_place_world,req.body.favorite_place_us,req.body.hobby,req.body.healthy_tip,req.body.book];

        if (req.body.remote_coaching == "true") {
            req.body.remote_coaching = 1;

        }
        else {
            req.body.remote_coaching = 0 ;
        }
      

        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Adding Survey Responses "});
            } else {
                res.json({"Success" : true,  "Message" : "Trainer Survey Responses Added !"});
            }
        });
    });


    router.post("/account/usersurvey",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var table = ["userInfo","user_id", "full_name","gender","preferred_gender","birthday","facebook","healthy_reason","current_challenges","occupation","days_per_week","hours_per_week","remote_coaching","favorite_place_world","favorite_place_us","favorite_hobby","favorite_book",req.body.user_id,req.body.name,req.body.gender,req.body.preferred_gender,req.body.birthday,req.body.facebook,req.body.healthy_reason,req.body.current_challenges,req.body.occupation,req.body.days_per_week,req.body.hours_per_week,req.body.remote_coaching,req.body.favorite_place_world,req.body.favorite_place_us,req.body.hobby,req.body.book];

        if (req.body.remote_coaching == "true"){
            req.body.remote_coaching = 1;

        }
        else {
            req.body.remote_coaching = 0 ;
        }
      

        query = mysql.format(query,table);

        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query: Adding Survey Responses "});
            } else {
                res.json({"Success" : true,  "Message" : "User Survey Responses Added !"});
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

   router.put("/account/updatepassword",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ? AND ?? = ?";
        var table = ["users","user_password", req.body.newpassword,"user_email",req.body.email,"user_password",req.body.oldpassword];
       
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){

            if(err) {
                res.json({"Error" : true, "Message" : "Error Changing Password"});
            } 
        
            
            else {
                
                res.json({"Success" : true,  "Message" : "Password Changed Successfully"});


            }

            
        });
    });

  


   router.put("/account/updatephone",function(req,res){
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