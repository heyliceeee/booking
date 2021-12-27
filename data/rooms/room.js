//criar a lógica para armazenar os schemas dos rooms
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Tags = new Schema({
    typeRoom: { type: String, required: false },
    vip: { type: Boolean, required: false, default: false },
    nPool: { type: Number, required: false, default: 0 },
    carPark: { type: Boolean, required: false, default: false },
    breakfast: { type: Boolean, required: false, default: false },
    lunch: { type: Boolean, required: false, default: false },
    spa: { type: Boolean, required: false, default: false },
    nStars: { type: String, required: false, default: 0 },
    nSingleBed: { type: Number, required: false, default: 0 },
    nDoubleBed: { type: Number, required: false, default: 0 }
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
    description: { type: String, required: false },
    nAdult: { type: Number, required: false },
    nChild: { type: Number, required: false },
    nRoom: { type: Number, required: false },
    price: { type: Number, required: false, currency: "EUR" },
    tags: [{ type: Tags }]
});

//criar um modelo para usar o schema
let Room = mongoose.model('Room', RoomSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Room;