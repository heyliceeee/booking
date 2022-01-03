const express = require('express');
const Rooms = require('../data/rooms');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const User = require('../data/users/user');
const pagination = require('../middleware/pagination');
const fileUpload = require('express-fileupload');
const VerifyToken = require('../middleware/Token');
const cookieParser = require('cookie-parser');


function RoomRouter() {

    let router = express();


    //camadas
    router.use(express.json({
        limit: '100mb'
    }
    ));

    router.use(express.urlencoded({
        limit: '100mb', extended: true
    }
    ));

    router.use(function (req, res, next) {
        var today = new Date();

        console.log('Time:', today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        next();
    });

    router.use(pagination);
    //fim camadas    


    //-------------------------------------------------------------------------------------//
    //------------------------------------EDITOR ROUTES-----------------------------------//
    //-----------------------------------------------------------------------------------//

    //-------------------------------------------------------------------------------------//
    //------------------------------------USER ROUTES------------------------------------ //
    //-----------------------------------------------------------------------------------//

    //?page=1&limit=1

    //-------------------------------------------------------------------------------------//
    //------------------------------------ALL ROUTES--------------------------------------//
    //-----------------------------------------------------------------------------------//

    router.route('/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {

            Rooms.findAll(req.pagination)
                .then((responseServer) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    next();
                });
        })


    router.route('/rooms/mostrecent')
        //GET - findAll rooms
        .get(function (req, res, next) {

            Rooms.findAllMostRecent(req.pagination)
                .then((responseServer) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    next();
                });
        })


    router.route('/rooms/lowprice')
        //GET - findAll rooms
        .get(function (req, res, next) {

            Rooms.findAllLowPrice(req.pagination)
                .then((responseServer) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    next();
                });
        })


    router.route('/rooms/highprice')
        //GET - findAll rooms
        .get(function (req, res, next) {

            Rooms.findAllHighPrice(req.pagination)
                .then((responseServer) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    next();
                });
        })


    router.route('/rooms/morestars')
        //GET - findAll rooms
        .get(function (req, res, next) {

            Rooms.findAllMoreStars(req.pagination)
                .then((responseServer) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    next();
                });
        })


    router.route('/rooms/lessstars')
        //GET - findAll rooms
        .get(function (req, res, next) {

            Rooms.findAllLessStars(req.pagination)
                .then((responseServer) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    next();
                });
        })


    router.route('/rooms/:roomId')
        //GET - findById room
        .get(function (req, res, next) {
            let roomId = req.params['roomId'];

            Rooms.findById(roomId, req.pagination)
                .then((responseServer) => {
                    console.log('---| find one room by ID|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('"---| error|---"');
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:roomId/tags')
        //GET - findById room return tags
        .get(function (req, res, next) {
            let roomId = req.params['roomId'];
            let tags = req.body.tags;

            Rooms.findById(roomId)
                .then((room) => {
                    console.log('---| find one room by ID return tags|---'); //retorna as tags do room pelo Id
                    res.status(200);
                    res.send(room.tags);
                    next();
                })

                .catch((err) => {
                    console.log('"---| error|---"');
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:description')
        //GET - findByDescription room
        .get(function (req, res, next) {

            let description = req.params['description'];


            Rooms.findByDescription(description, req.pagination)
                .then((responseServer) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:description/mostrecent')
        //GET - findByDescription room
        .get(function (req, res, next) {

            let description = req.params['description'];


            Rooms.findByDescriptionMostRecent(description, req.pagination)
                .then((responseServer) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:description/lessstars')
        //GET - findByDescription room
        .get(function (req, res, next) {

            let description = req.params['description'];


            Rooms.findByDescriptionLessStars(description, req.pagination)
                .then((responseServer) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:description/morestars')
        //GET - findByDescription room
        .get(function (req, res, next) {

            let description = req.params['description'];


            Rooms.findByDescriptionMoreStars(description, req.pagination)
                .then((responseServer) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:description/lowprice')
        //GET - findByDescription room
        .get(function (req, res, next) {

            let description = req.params['description'];


            Rooms.findByDescriptionLowPrice(description, req.pagination)
                .then((responseServer) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })


    router.route('/rooms/:description/highprice')
        //GET - findByDescription room
        .get(function (req, res, next) {

            let description = req.params['description'];


            Rooms.findByDescriptionHighPrice(description, req.pagination)
                .then((responseServer) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })



    //-------------------------------------------------------------------------------------------//
    //------------------------------------ROUTES COM TOKEN--------------------------------------//
    //------------------------------------------------------------------------------------------//

    /* router.use(function (req, res, next) {

        let token = req.headers['x-access-token'];


        if (!token) {
            return res.status(401).send({ auth: false, message: 'no token provided.' })
        }


        Users.verifyToken(token)
            .then((decoded) => {

                req.roleUser = decoded.role;
                next();
            })

            .catch(() => {
                res.status(401).send({ auth: false, message: 'not authorized' })
            })
    }); */

    router.use(cookieParser());
    router.use(VerifyToken);


    //-------------------------------------------------------------------------------------------//
    //------------------------------------ADMIN EDITOR ROUTES------------------------------------//
    //------------------------------------------------------------------------------------------//

    router.route('/rooms')
        //POST - create rooms
        .post(Users.autorize([scopes['create-room']]), function (req, res, next) {

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
                    console.log('---|error|---');
                    console.log(err);
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });


    router.route('/rooms/:roomId')
        //PUT - update room by ID
        .put(Users.autorize([scopes['update-room']]), function (req, res, next) {

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
                    console.log('---|error|---');
                    res.status(404);
                    next();
                });
        })

        //DELETE - delete room by ID
        .delete(Users.autorize([scopes['delete-room']]), function (req, res, next) {

            console.log("---|delete one room by ID|---")

            let roomId = req.params['roomId'];


            Rooms.removeById(roomId)
                .then(() => {
                    console.log('delete');
                    res.status(200);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    res.status(404);
                    next();
                });
        });


    return router;
}

module.exports = RoomRouter;