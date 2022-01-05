//criar a lógica para armazenar os schemas dos rooms
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Tags = new Schema({
    extras: [{ type: String, required: false}]
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
    image: { type: String, required: false },
    description: { type: String, required: false },
    nAdult: { type: Number, required: false },
    nChild: { type: Number, required: false },
    nRoom: { type: Number, required: false },
    price: { type: Number, required: false, currency: "EUR" },
    typeRoom: { type: String, required: false },
    nStars: { type: String, required: false, default: 0 },
    nSingleBed: { type: Number, required: false, default: 0 },
    nDoubleBed: { type: Number, required: false, default: 0 },
    extras: [{ type: String, required: false}]
});

//criar um modelo para usar o schema
let Room = mongoose.model('Room', RoomSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Room;