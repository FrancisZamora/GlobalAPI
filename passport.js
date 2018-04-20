// config/passport.js
        
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var mysql = require("mysql");
var connection = mysql.createConnection({
        connectionLimit : 100,
        host     : 'globaljoy.cwulowdxlu9l.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Yourethebest!',
        database : 'GlobalJoy',
        debug    :  false
});



// expose this function to our app using module.exports
module.exports = function(passport) {


  // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
 
  

  // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
     function(req,res){

        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        bcrypt.hash(req.body.password,10, function(err,hash) {
        req.body.password = hash;
        console.log(hash);
        var table = ["users","user_email","user_password","phone","name","role",req.body.email,req.body.password, req.body.phone,req.body.name,req.body.role];
        if (req.body.role == 'trainer') {
            req.body.role = 0;
        }
        else if (req.body.role == 'trainee') {
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


    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
      function(req,resp){
        var query = "SELECT ?? FROM ?? WHERE ?? = ? ";
        var table = ["user_password", "users","user_email",req.body.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            console.log(rows);
            if(err) {
                resp.json({"Error" : true, "Message" : "Error Logging in"});
            } 

            bcrypt.compare(req.body.password,rows[0].user_password, function(err, res) {
                console.log(res);
                if (res) {
                    resp.json({"Success":true,"message" : "Login successful"});
                   // res.json({"Success":true, "Message" : "Login Successful"});

                }
                else {
                    resp.json({"Error": true, "Message"  :"Incorrect Password or Username"});

                }
         

            
             });
           });
        }));

};


