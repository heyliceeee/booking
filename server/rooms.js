const express = require('express');
const Rooms = require('../data/rooms');

function RoomRouter() {

    let router = express();


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



    router.route('/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {
            
            Rooms.findAll()
                .then((rooms) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms
                    res.send(rooms);
                    next();
                })

                .catch((err) => {
                    console.log('"---|error|---"');
                    next();
                });
        })

        //POST - create rooms
        .post(function (req, res, next) {
            console.log('---|create room|---');
            let body = req.body;

            Rooms.create(body)
                .then(() => {
                    console.log('save');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('"---|error|---"');
                    console.log('room already exists');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });




    router.route('/hotel')
        //PUT - 
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    return router;
}

module.exports = RoomRouter;