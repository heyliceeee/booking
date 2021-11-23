const express = require('express');
const Rooms = require('../data/rooms');
const Users = require('../data/users');
const Reserves = require('../data/reserves');

function ReserveRouter() {

    let router = express()

    //camadas
    router.use(express.json({ 
        limit: '100mb' }
    ));

    router.use(express.urlencoded({ 
        limit: '100mb', extended: true }
    ));

    router.use(function (req, res, next) {
        var today = new Date(); 

        console.log('Time:', today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        next();
    });
    //fim camadas    

    


    return router;
}
module.exports = ReserveRouter;