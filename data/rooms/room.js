//criar a lógica para armazenar os schemas dos rooms
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//criar uma schema
let RoomSchema = new Schema({
    id: { type: Number,  required: true, unique: true },
    descricao: { type: String, required: true},
    dataCheckIn: { type: Date, required: false, default: 0000-00-00},
    dataCheckOut: { type: Date, required: false, default: 0000-00-00},
    capacidadeAdulto: { type: Number, required: false, default: 0},
    capacidadeCrianca: { type: Number, required: false, default: 0},
    preco: { type: Number, required: true },
});

//criar um modelo para usar o schema
let Room = mongoose.model('Room', RoomSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Room;