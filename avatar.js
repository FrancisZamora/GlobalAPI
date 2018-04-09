const mysql = require("mysql");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3'); 

AWS.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region:'us-east-1'
});

const s3 = new AWS.S3(); 


function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
      const upload = multer({
          storage: multerS3({
           s3: s3,
          acl: 'public-read',
          bucket: 'globaljoy',
         key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); 
          }
        })
    });
router.post('/upload', upload.array('file',1), (req, res, next) => {
    res.send("Uploaded!");
});
       
       



    

      






	  




}

module.exports = REST_ROUTER;