var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

   

     router.post("/survey/trainersurvey",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var table = ["trainer_survey","user_id", "full_name","gender","birthday","personal_website","degrees","years_of_experience","practice_challenges","number_of_clients","days_per_week","hours_per_week","remote_coaching","favorite_place_world","favorite_place_us","favorite_hobby","healthy_tip","favorite_book",req.body.user_id,req.body.name,req.body.gender,req.body.birthday,req.body.personal_website,req.body.degrees,req.body.years_of_experience,req.body.challenges,req.body.number_of_clients,req.body.days_per_week,req.body.hours_per_week,req.body.remote_coaching,req.body.favorite_place_world,req.body.favorite_place_us,req.body.hobby,req.body.healthy_tip,req.body.book];

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


    router.post("/survey/traineesurvey",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var table = ["trainee_survey","user_id", "full_name","gender","preferred_gender","birthday","facebook","healthy_reason","current_challenges","occupation","days_per_week","hours_per_week","remote_coaching","favorite_place_world","favorite_place_us","favorite_hobby","favorite_book",req.body.user_id,req.body.name,req.body.gender,req.body.preferred_gender,req.body.birthday,req.body.facebook,req.body.healthy_reason,req.body.current_challenges,req.body.occupation,req.body.days_per_week,req.body.hours_per_week,req.body.remote_coaching,req.body.favorite_place_world,req.body.favorite_place_us,req.body.hobby,req.body.book];

        if (req.body.remote_coaching == "true"){
            req.body.remote_coaching = 1;

        }
        else if (req.body.remote_coaching == "false") {
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













}

module.exports = REST_ROUTER;