//router.js é a camada intermédia do rooms.js e o servidor

const express = require('express');
let RoomAPI = require('./server/rooms');
let AuthAPI = require('./server/auth');

function initialize(){
    
    let api = express();

    api.use('/hotel', RoomAPI());
    api.use('/auth', AuthAPI());

    return api;
}

module.exports = {
    initialize: initialize,
};