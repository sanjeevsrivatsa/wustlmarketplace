var mongoose = require('mongoose');

var users = {};

users.signup = function(req, res) {
    res.render('users/signup');
};

users.login = function(req, res) {
    res.render('users/login');
};

module.exports = users;
