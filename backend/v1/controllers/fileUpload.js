const multer = require("multer");
var multerS3 = require("multer-s3");
const aws = require("aws-sdk");


const spacesEndpoint = new aws.Endpoint("s3.amazonaws.com");
const s3 = new aws.S3({
  region: "us-east-1",
  credentials: {
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
  },
});
const storage = multerS3({
  s3: s3,
  acl: "public-read",
  bucket: "agrosonallince",
  key: function (req, file, cb) {
    //console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  },
});

module.exports.upload = multer({
  storage: storage,
});
