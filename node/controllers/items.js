var mongoose = require('mongoose');
var Item = require('../models/item');

var items = {};

items.getAllItems = function(req, res) {
    console.log('All items');
    Item.find({}, function(err, items) {
        res.json(items);
    });
};

items.getItem = function(req, res) {
    console.log(req.params.id);
    Item.findOne({ _id: req.params.id }, function(err, item) {
        res.json(item);
    });
};

module.exports = items;
