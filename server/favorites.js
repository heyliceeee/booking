const express = require('express');
const Favorites = require('../data/favorites');
const Rooms = require('../data/rooms');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const pagination = require('../middleware/pagination');
const VerifyToken = require('../middleware/Token');
const cookieParser = require('cookie-parser');


function FavoriteRouter() {

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

    router.use(cookieParser());
    router.use(VerifyToken);
    //fim camadas



    //------------------------------------------------------------------------------------//
    //------------------------------------USER ROUTES------------------------------------//
    //----------------------------------------------------------------------------------//

    router.route('/favorites/:roomId')
        //POST - create favorites
        .post(Users.autorize([scopes['create-favorite']]), function (req, res, next) {

            console.log('---|create favorite|---');

            let roomId = req.params['roomId'];
            let body = req.body;

            Favorites.create(body, roomId)
                .then((body) => {
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


    router.route('/user/favorites/:idUser')
        //GET - findAll favorites
        .get(Users.autorize([scopes['read-own-favorites']]), function (req, res, next) {

            let idUser = req.params['idUser'];


            Favorites.findByUserId(idUser, req.pagination)
                .then((responseServer) => {
                    console.log('---|MY FAVORITES|---'); //retorna o favorite pelo Id

                    const response = { auth: true, ...responseServer };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('"---|USER error|---"');
                    console.log(err);
                    next();
                });
        });


    router.route('/favorites/:favoriteId')
        //DELETE - delete room by ID
        .delete(Users.autorize([scopes['delete-favorite']]), function (req, res, next) {

            let favoriteId = req.params['favoriteId'];

            Favorites.removeById(favoriteId)
                .then(() => {
                    console.log("---|delete one favorite by ID|---")
                    res.status(200);
                    res.send("delete successfully");
                    next();
                })

                .catch((err) => {
                    console.log('"---|error|---"');
                    res.status(404);
                    next();
                });
        });


    return router;
}

module.exports = FavoriteRouter; 