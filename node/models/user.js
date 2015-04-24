var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    email: { type: String, required: true },
    hashed_password: { type: String, default: '' },
    salt: { type: String, default: '' },
    token: { type: String, default: '' },
    confirmed: { type: Boolean, default: false }
});

//TODO add validation

UserSchema.virtual('password').set( function(password) {
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
    this.token = this.makeSalt();
});

var validatePresenceOf = function(value) {
    return value && value.length;
}

UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();
    if (!validatePresenceOf(this.hashed_password)) {
        next(new Error('No password supplied'));
    } else {
        next();
    }
});

UserSchema.methods.authenticate = function(password) {
    return this.encryptPassword(password) === this.hashed_password;
};

UserSchema.methods.makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};

UserSchema.methods.encryptPassword = function(password) {
    if (!password) return '';
    var encrypted;
    try {
        encrypted = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        return encrypted;
    } catch (err) {
        return '';
    }
};

module.exports = mongoose.model('User', UserSchema); 
