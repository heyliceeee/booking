//router.js é a camada intermédia do rooms.js e o servidor

const express = require('express');
let RoomAPI = require('./server/rooms');

function initialize(){
    
    let api = express();

    api.use('/hotel', RoomAPI());

    return api;
}

module.exports = {
    initialize: initialize,
};