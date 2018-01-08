const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({
    //used unique so that mongoose see that it's a unique string so that mongoose cann't store the same string again.
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//On Save Hock, encryt password
//Before saving a model, run this function
userSchema.pre("save", function (next) {
    //get access to the user modal
    const user = this;

    //generate a salt then run a callback
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }

        //has (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            //overwrite plan text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        calllback(null, isMatch);
    });
}

//Create the model class
const ModalClass = mongoose.model('user', userSchema);

//Export a model
module.exports = ModalClass;