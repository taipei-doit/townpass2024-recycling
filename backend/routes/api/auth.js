var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

var login = require("../../controllers/login");

router.post("/login", async (req, res) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = '登入'
    #swagger.parameters['info'] = {
      in: 'body',
      schema: {
        user: 'user001',
        password: 'user001'
      }
    }
    #swagger.responses[200] = {
      description: 'Login succeed.',
      schema: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidXNlcjAwMSIsIm5hbWUiOiJ1c2VyMDAxIiwidHlwZSI6IuS9v-eUqOiAhSJ9LCJpYXQiOjE2ODU4MDk5MDAsImV4cCI6MjI5MDYwOTkwMH0.N74XF8SG-edT-3Bl2Z7C_YdTpxDM1R9FZXpYPcZX1iw'
      }
    }
    #swagger.responses[401] = {
      description: 'Login failed.'
    }
  */

    var account = req.body.user;
    var password = req.body.password;
    var result = await login(account, password);

    if (result) {
        var user = result.user;
        var payload = {user};
        var token = jwt.sign(payload, "thisisleetcodeguysprojext", {
            expiresIn: 7 * 24 * 60 * 60 * 1000
        });

        // if request from swagger
        if (req.get('host') === 'localhost:3000') {
            res.cookie("token", token, {maxAge: 7 * 24 * 60 * 60 * 1000});
        }

        req.userInfo = result.user;
        
        res.json({user: user, token: token});
    } else {
        res.status(401).end();
    }
}); 

module.exports = router;