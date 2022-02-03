//criar a lógica para armazenar os controllers dos favorites

const Favorites = require('./favorite');
const FavoritesService = require('./service');

const service = FavoritesService(Favorites);


module.exports = service;