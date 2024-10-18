var jwt = require("jsonwebtoken");

var key = "thisisleetcodeguysprojext";

function authByJwt(req, _, next) {
    var token;
    try {
        if (req.get("host") === "localhost:3000") {
            // from swagger
            token = req.cookies.token;
            
            // from post man or from browser
            if (!token) {
                token = req.headers.authorization;
            }
        } else {
            // from front-end
            token = req.headers.authorization;
        }
    } catch (e) {
        token = "";
    }

    jwt.verify(token, key, (err, decoded) => {
        if (!err) {
            req.user = decoded.user;
        }
        next();
    });
}

module.exports = authByJwt;
