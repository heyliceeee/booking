//criar a lógica para armazenar os schemas dos rooms
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Tags = new Schema({
    typeRoom: { type: String, required: true },
    nPool: { type: Number, required: false, default: 0},
    carPark: { type: Boolean, required: false, default: false},
    breakfast: { type: Boolean, required: false, default: false},
    lunch: { type: Boolean, required: false, default: false},
    spa: { type: Boolean, required: false, default: false},
    nStars: { type: Number, required: true, default: 0},
    nSingleBed: { type: Number, required: true, default: 0},
    nDoubleBed: { type: Number, required: true, default: 0}
});

/*
    Coisas que se poderiam adicionar:

    - Número de Estrelas ---DONE---
    - Classificiação 
    - c/s sauna 
    - c/s spa ---DONE---

*/

//criar uma schema
let RoomSchema = new Schema({
    description: { type: String, required: true},
    nAdult: { type: Number, required: true },
    nChild: { type: Number, required: true },
    nRoom: { type: Number, required: true },
    price: { type: Number, required: true, currency: "EUR" },
    tags: [{ type: Tags }]
});

//criar um modelo para usar o schema
let Room = mongoose.model('Room', RoomSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Room;