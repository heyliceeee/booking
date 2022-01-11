const express = require('express');
const Comments = require('../data/comments');
const Rooms = require('../data/rooms');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const pagination = require('../middleware/pagination');
const VerifyToken = require('../middleware/Token');
const cookieParser = require('cookie-parser');


function CommentRouter() {

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
    //------------------------------------ALL ROUTES--------------------------------------//
    //-----------------------------------------------------------------------------------//

    router.route('/comments/:idRoom')
        //GET - findAll reserves
        .get(function (req, res, next) {

            let idRoom = req.params['idRoom'];


            Comments.findByRoomId(idRoom, req.pagination)
                .then((responseServer) => {

                    console.log('---|all comments|---'); //retorna todos os comments pelo idroom
                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    next();
                });
        })


    //------------------------------------------------------------------------------------//
    //------------------------------------USER ROUTES------------------------------------//
    //----------------------------------------------------------------------------------//
    router.use(cookieParser());
    router.use(VerifyToken);


    router.route('/comments/:roomId')
        //POST - create reserves
        .post(Users.autorize([scopes['create-comment']]), function (req, res, next) {

            console.log('---|create comment|---');

            let roomId = req.params['roomId'];
            let body = req.body;

            Comments.create(body, roomId)
                .then((body) => {
                    console.log('save');
                    res.status(200);
                    res.send(body);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    err.status = err.status || 500;
                    res.status(401);
                    next();
                });
        });


    return router;
}

module.exports = CommentRouter;