var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    details: { type: String, default: '' },
    price: { type: Number, get: getPrice, set: setPrice },
    createdAt: { type: Date, default: Date.now() },
});

function getPrice(num) {
    return (num/100).toFixed(2);
}

function setPrice(num) {
    return num*100;
}

module.exports = mongoose.model('Item', ItemSchema); 
