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




//-------------------------------------------------------------------------------------//
//------------------------------------ADMIN ROUTES------------------------------------//
//-----------------------------------------------------------------------------------//

    router.route('/admin/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {
            Rooms.findAll()
                .then((rooms) => {
                    console.log('---|ADMIN all rooms|---'); //retorna todos os rooms
                    res.send(rooms);
                    next();
                })

                .catch((err) => {
                    console.log('"---|ADMIN error|---"');
                    next();
                });
        })
        
        //POST - create rooms
        .post(function (req, res, next) {
            console.log('---|ADMIN create room|---');
            let body = req.body;

            Rooms.create(body)
                .then(() => {
                    console.log('save');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('"---|ADMIN error|---"');
                    console.log('room already exists');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });


        router.route('/admin/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {
                let roomId = req.params['roomId'];

                Rooms.findById(roomId)
                    .then((room) => {
                        console.log('---|ADMIN find one room by ID|---'); //retorna o room pelo Id
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|ADMIN error|---"');
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
                        console.log('---|ADMIN update one room by ID|---'); //altera dados do room
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|ADMIN error|---"');
                        res.status(404);
                        next();
                    });
            })

            //DELETE - delete room by ID
            .delete(function (req, res, next) {
                let roomId = req.params['roomId'];

                Rooms.removeById(roomId)
                    .then(() => {
                        console.log("---|ADMIN delete one room by ID|---")
                        res.status(200);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|ADMIN error|---"');
                        res.status(404);
                        next();
                    });
            });


            router.route('/admin/rooms/:roomId/tags')
                //GET - findById room return tags
                .get(function (req, res, next) {
                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
    
                    Rooms.findById(roomId)
                        .then((room) => {
                            console.log('---|ADMIN find one room by ID return tags|---'); //retorna as tags do room pelo Id
                            res.status(200);
                            res.send(tags);
                            next();
                        })
    
                        .catch((err) => {
                            console.log('"---|ADMIN error|---"');
                            res.status(404);
                            next();
                        });
                })




//-------------------------------------------------------------------------------------//
//------------------------------------EDITOR ROUTES-----------------------------------//
//-----------------------------------------------------------------------------------//

router.route('/editor/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {
            Rooms.findAll()
                .then((rooms) => {
                    console.log('---|EDITOR all rooms|---'); //retorna todos os rooms
                    res.send(rooms);
                    next();
                })

                .catch((err) => {
                    console.log('"---|EDITOR error|---"');
                    next();
                });
        })
        
        //POST - create rooms
        .post(function (req, res, next) {
            console.log('---|EDITOR create room|---');
            let body = req.body;

            Rooms.create(body)
                .then(() => {
                    console.log('save');
                    res.status(200);
                    res.send(body);
                    next();
                })
                .catch((err) => {
                    console.log('"---|EDITOR error|---"');
                    console.log('room already exists');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });


        router.route('/editor/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {
                let roomId = req.params['roomId'];

                Rooms.findById(roomId)
                    .then((room) => {
                        console.log('---|EDITOR find one room by ID|---'); //retorna o room pelo Id
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---EDITOR |error|---"');
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
                        console.log('---|EDITOR update one room by ID|---'); //altera dados do room
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|EDITOR error|---"');
                        res.status(404);
                        next();
                    });
            })


            router.route('/editor/rooms/:roomId/tags')
                //GET - findById room return tags
                .get(function (req, res, next) {
                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
    
                    Rooms.findById(roomId)
                        .then((room) => {
                            console.log('---|EDITOR find one room by ID return tags|---'); //retorna as tags do room pelo Id
                            res.status(200);
                            res.send(tags);
                            next();
                        })
    
                        .catch((err) => {
                            console.log('"---|EDITOR error|---"');
                            res.status(404);
                            next();
                        });
                })




//-------------------------------------------------------------------------------------//
//------------------------------------USER ROUTES------------------------------------ //
//-----------------------------------------------------------------------------------//

router.route('/user/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {
            Rooms.findAll()
                .then((rooms) => {
                    console.log('---|USER all rooms|---'); //retorna todos os rooms
                    res.send(rooms);
                    next();
                })

                .catch((err) => {
                    console.log('"---|USER error|---"');
                    next();
                });
        })


        router.route('/user/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {
                let roomId = req.params['roomId'];

                Rooms.findById(roomId)
                    .then((room) => {
                        console.log('---|USER find one room by ID|---'); //retorna o room pelo Id
                        res.status(200);
                        res.send(room);
                        next();
                    })

                    .catch((err) => {
                        console.log('"---|USER error|---"');
                        res.status(404);
                        next();
                    });
            })


            router.route('/user/rooms/:roomId/tags')
                 //GET - findById room return tags
                 .get(function (req, res, next) {
                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
    
                    Rooms.findById(roomId)
                        .then((room) => {
                            console.log('---|USER find one room by ID return tags|---'); //retorna as tags do room pelo Id
                            res.status(200);
                            res.send(tags);
                            next();
                        })
    
                        .catch((err) => {
                            console.log('"---|USER error|---"');
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