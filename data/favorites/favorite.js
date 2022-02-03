//criar a lógica para armazenar os schemas dos favorites
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//criar um schema
let FavoriteSchema = new Schema({
    idUser: { type: String },
    idRoom: { type: String }
});

//criar um modelo para usar o schema
let Favorite = mongoose.model('Favorite', FavoriteSchema);

//tornar isto disponível para os nossos users
module.exports = Favorite;
