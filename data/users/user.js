let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const scopes = require('./scopes');

let RoleSchema = new Schema({
    nameRole: { type: String, required: true, unique: true, default: "user" },
    scopes: [{
        type: String, enum:
            [
                scopes["read-own-reserves"], scopes["update-own-reserve"],
                scopes["read-users"],
                scopes["update-reserve"], scopes["read-reserves"], scopes["delete-reserve"], scopes["create-room"], scopes["update-room"], scopes["read-reserve-client"],
                scopes["create-reserve"], scopes["detail-reserve"], scopes["verify-logged-in"]
            ], default: scopes["read-own-reserves"]
    }]
});

//create a schema
let UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: RoleSchema }
});

//the schema is useless so far
//we need to create a model using it
let User = mongoose.model('User', UserSchema);

//make this available to our users in our Node applications
module.exports = User;