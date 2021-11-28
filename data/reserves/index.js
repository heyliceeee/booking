//criar a lógica para armazenar os controllers dos reserves

const Reserves = require('./reserve');
const ReservesService = require('./service');

const service = ReservesService(Reserves);


module.exports = service;