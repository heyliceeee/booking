//criar a lógica para armazenar os schemas dos rooms
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//criar uma schema
let ReserveSchema = new Schema({
    idUser : { type: Number, required: true },
    idRoom : { type: Number, required: true},
    checkinDate: { type: Date, required: true},
    checkoutDate: { type: Date, required: false},
});

//criar um modelo para usar o schema
let Reserve = mongoose.model('Reserve', RoomSchema);

//tornar isto disponível para os nossos users nas nossas node apps
module.exports = Reserve;