//criar a lógica para armazenar os controllers dos rooms

const Rooms = require('./room');
const RoomsService = require('./service');

const service = RoomsService(Rooms);

module.exports = service;