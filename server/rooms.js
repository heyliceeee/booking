const express = require('express');
const Rooms = require('../data/rooms');

function RoomRouter() {

    let router = express();

    router.use(express.json({ limit: '100mb' }));
    router.use(express.urlencoded({ limit: '100mb', extended: true }));


    //criar get e post para o path /rooms
    router.route('/rooms')
        //get
        .get(function (req, res, next) {
            console.log('get all Rooms'); //retorna todos os rooms
            Rooms.findAll()
                .then((rooms) => {
                    res.send(rooms);
                    next();
                })
                .catch((err) => {
                    next();
                });
        })

        //post
        .post(function (req, res, next) {
            console.log('post');
            let body = req.body;

            //post do create rooms
            Rooms.create(body)
                .then(() => {
                    console.log('gravei');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('já existe');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });


    //criar put para o path /hotel
    router.route('/hotel')
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    return router;
}

module.exports = RoomRouter;