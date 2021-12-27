const express = require('express');
const Rooms = require('../data/rooms');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const User = require('../data/users/user');

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

    router.use(function (req, res, next) {

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
    });
    //fim camadas    




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

            let roomId = req.params['roomId'];


            Rooms.removeById(roomId)
                .then(() => {
                    console.log("---|delete one room by ID|---")
                    res.status(200);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    res.status(404);
                    next();
                });
        });




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

            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];

            Rooms.findAll(pageNumber, nPerPage)
                .then((rooms) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms
                    res.send(rooms);
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

            Rooms.findById(roomId)
                .then((room) => {
                    console.log('---| find one room by ID|---'); //retorna o room pelo Id
                    res.status(200);
                    res.send(room);
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
            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];


            Rooms.findByDescription(description, pageNumber, nPerPage)
                .then((room) => {
                    console.log('---|find room by description|---'); //retorna o room pelo Id
                    res.status(200);
                    res.send(room);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    res.status(404);
                    next();
                });
        })

    return router;
}

module.exports = RoomRouter;