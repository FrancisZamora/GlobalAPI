var express = require("express");
var mysql   = require("mysql");

var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();
var search = require('./search.js');
var account = require('./account.js');
var survey = require('./survey.js');
var message = require('./message.js');
var profile = require('./profile.js');
var avatar = require('./avatar.js');
var review = require('./review.js');
var appointment = require("./appointment.js");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

require('./passport.js')
require('dotenv').config()





function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'globaljoy.cwulowdxlu9l.us-east-1.rds.amazonaws.com',
        user     : 'root',
        password : 'Yourethebest!',
        database : 'GlobalJoy',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}







REST.prototype.configureExpress = function(connection) {
      var self = this;
     

      app.use(function(req, res, next) {
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
       next();
     });
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
 
      var router = express.Router();



      
  


      app.use('/api', router);
      app.get('/', (req, res) => {
        res.json({
        message: 'Welcome to the GlobalJoy API!'
      });
      });

    function verifyToken(req, res, next) {
      // Get auth header value
      const bearerHeader = req.headers['authorization'];
      // Check if bearer is undefined
      if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
      } else {
        // Forbidden
        res.sendStatus(403);

      }

  }

 
      var rest_router = new rest(router,connection,md5,verifyToken,jwt);
      var search_router = new search(router,connection,md5,verifyToken,jwt);
      var account_router = new account(router,connection,md5,verifyToken,jwt);
      var survey_router = new survey(router,connection,md5,verifyToken,jwt);
      var message_router = new message(router,connection,md5,verifyToken,jwt);
      var profile_router = new profile(router,connection,md5,verifyToken,jwt);
      var review_router = new review(router,connection,md5,verifyToken,jwt);
      var avatar_router = new avatar(router,connection,md5,verifyToken,jwt);
      var appointment_router = new appointment(router,connection,md5,verifyToken,jwt);

       


      self.startServer();
}

REST.prototype.startServer = function() {

    console.log(process.env.secretAccessKey);

    if (process.env.PORT)  {
      app.listen(process.env.PORT ,function(){
          console.log("Alright ! I am alive at" + process.env.PORT );
      });
    }
    else {
      app.listen(3000 ,function(){
          console.log("Alright ! I am alive at PORT 3000");
      });
    }
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}





new REST();
