//router.js é a camada intermédia do rooms.js e o servidor

const express = require('express');
let RoomAPI = require('./server/rooms');
let AuthAPI = require('./server/auth');
let ReserveAPI = require('./server/reserves');
let FavoriteAPI = require('./server/favorites');
let CommentAPI = require('./server/comments');

function initialize() {

    let api = express();

    api.use('/hotel', RoomAPI());
    api.use('/auth', AuthAPI());
    api.use('/reserve', ReserveAPI());
    api.use('/favorite', FavoriteAPI());
    api.use('/comment', CommentAPI());

    return api;
}

module.exports = {
    initialize: initialize,
};