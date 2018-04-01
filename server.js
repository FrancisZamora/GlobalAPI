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
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
            var router2 = express.Router();

      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      var search_router = new search(router,connection,md5);
      var account_router = new account(router,connection,md5);
      var survey_router = new survey(router,connection,md5);
      var message_router = new message(router,connection,md5);


      self.startServer();
}

REST.prototype.startServer = function() {

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