require('dotenv').config();

function setOrigin(domain) {
    return function (_, res, next) {
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Accept, Content-Type, Cookie, Set-Cookie, authorization"
      );
      // if (process.env.NODE_ENV === "dev") {
      //   res.setHeader("Access-Control-Allow-Origin", "*");
      // }
      // res.setHeader("Access-Control-Allow-Origin", domain);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH"
      );
      res.setHeader("Access-Control-Allow-Credentials", true);
      next();
    };
  }
  
  module.exports = setOrigin;