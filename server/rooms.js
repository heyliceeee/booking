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


        router.route('/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {
                let roomId = req.params['roomId'];

                Rooms.findById(roomId)
                    .then((room) => {
                        console.log('---|find one room by ID|---'); //retorna o room pelo Id
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|error|---"');
                        res.status(404);
                        next();
                    });
            })

            //PUT - update room by ID
            .put(function (req, res, next) {
                let roomId = req.params['roomId'];
                let body = req.body;

                Rooms.update(roomId, body)
                    .then((room) => {
                        console.log('---|update one room by ID|---'); //altera dados do room
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|error|---"');
                        res.status(404);
                        next();
                    });
            })

            //DELETE - delete room by ID
            .delete(function (req, res, next) {
                let roomId = req.params['roomId'];

                Rooms.removeById(roomId)
                    .then(() => {
                        console.log("---|delete one room by ID|---")
                        res.status(200);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|error|---"');
                        res.status(404);
                        next();
                    });
            });


            router.route('/rooms/:roomId/tags')
                 //GET - findById room return tags
                 .get(function (req, res, next) {
                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
    
                    Rooms.findById(roomId)
                        .then((room) => {
                            console.log('---|find one room by ID return tags|---'); //retorna as tags do room pelo Id
                            res.status(200);
                            res.send(tags);
                            next();
                        })
    
                        .catch((err) => {
                            console.log('"---|error|---"');
                            res.status(404);
                            next();
                        });
                })


    router.route('/hotel')
        //PUT - 
        .put(function (req, res) {
            console.log('put');
            res.send('put');
        });

    return router;
}

module.exports = RoomRouter;