const Reserves = require('./reserves');
const ReservesService = require('./service');

const service = ReservesService(Reserves);

module.exports = service;