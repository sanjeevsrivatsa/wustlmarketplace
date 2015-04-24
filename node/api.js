var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var moment = require('moment');

// Routes for users
var users = require('./controllers/users');
var User = require('./models/user');
router.get('/login', users.login);
router.get('/signup', users.signup);
router.post('/login', function(req, res) {
    var user = User.findOne({email: req.body.email}, function(err, user) {
        if (err) res.send(401);
        if (!user) {
            //Invalid email
            return res.send(401);
        }
        if (!user.confirmed) {
            //User has not confirmed email
            return res.send(401);
        }
        if (!user.authenticate(req.body.password)) {
            //Invalid password
            return res.send(401);
        }

        var expires = moment().add(1, 'days').valueOf();
        var token = jwt.encode({
            id: user.id,
            exp: expires
        }, 'SECRET');
        user.token = token;
        user.save(null);
        
        res.json({
            token: token,
            user: user.toJSON()
        });
    });
});
 

// Routes for items
var items = require('./controllers/items');
router.get('/items', items.getAllItems);
router.get('/items/:id', items.getItem);

module.exports = router;
