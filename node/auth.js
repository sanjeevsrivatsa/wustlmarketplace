var jwt = require('jwt-simple');

var User = require('./models/user');

module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, 'SECRET');
            console.log(decoded);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
            User.findOne({ _id: decoded.id }, function(err, user) {
                //TODO store tokens somewhere else and verify beforehand, this doesnt really work
                if (user.token !== token) res.end('Invalid token', 400);
                req.user = user;
                next();
            });
        } catch (err) {
            console.log(err);
            return next();
        }
    } else {
        next();
    }
};
