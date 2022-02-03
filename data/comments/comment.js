//criar a lógica para armazenar os schemas dos comments
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//criar um schema
let CommentSchema = new Schema({
    date: { type: String },
    comment: { type: String },
    rating: { type: Number },
    idUser: { type: String },
    nameUser: { type: String },
    idRoom: { type: String }
});

//criar um modelo para usar o schema
let Comment = mongoose.model('Comment', CommentSchema);

//tornar isto disponível para os nossos users
module.exports = Comment;
