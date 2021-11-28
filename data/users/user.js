let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//create a schema
let UserSchema = new Schema({
    name: {type: String, required: true, unique: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role : { type: String, default: "user", enum: ["user", "editor",  "admin"]},
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false }
});

//the schema is useless so far
//we need to create a model using it
let User = mongoose.model('User', UserSchema);

//make this available to our users in our Node applications
module.exports = User;