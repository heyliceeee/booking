//criar a lógica para armazenar os schemas dos rooms
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Tags = new Schema({
    typeRoom: { type: String, required: true },
    nPool: { type: Number, required: false, default: 0},
    carPark: { type: Boolean, required: false, default: false},
    breakfast: { type: Boolean, required: false, default: false},
    lunch: { type: Boolean, required: false, default: false}
});

//criar uma schema
let RoomSchema = new Schema({
    description: { type: String, required: true},
    nAdult: { type: Number, required: true },
    nChild: { type: Number, required: true },
    price: { type: Number, required: true, currency: "EUR" },
    tags: [{ type: Tags }]
});

//criar um modelo para usar o schema
let Room = mongoose.model('User', RoomSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Room;