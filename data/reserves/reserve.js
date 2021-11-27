//criar a lógica para armazenar os schemas dos reserves
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//criar um schema
let ReserveSchema = new Schema({
    dateCheckIn: { type: Date, default: Date.now },
    dateCheckOut: { type: Date },
    idUser: { type: String, default: "" },
    nameUser: { type: String, default: "" },
    idRoom: { type: String, default: "" }
});

//criar um modelo para usar o schema
let Reserve = mongoose.model('Reserve', ReserveSchema);

//tornar isto disponível para os nossos users
module.exports = Reserve;