//criar a lógica para armazenar os controllers dos comments

const Comments = require('./comment');
const CommentsService = require('./service');

const service = CommentsService(Comments);


module.exports = service;