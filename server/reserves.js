const express = require('express');
const Reserves = require('../data/reserves');
const Rooms = require('../data/rooms');
const Users = require('../data/users');
const scopes = require('../data/users/scopes');
const pagination = require('../middleware/pagination');
const VerifyToken = require('../middleware/Token');
const cookieParser = require('cookie-parser');


function ReserveRouter() {

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



    //-------------------------------------------------------------------------------------------//
    //------------------------------------ADMIN EDITOR ROUTES------------------------------------//
    //------------------------------------------------------------------------------------------//

    router.route('/reserves')
        //GET - findAll reserves
        .get(Users.autorize([scopes['read-reserves']]), function (req, res, next) {

            console.log('---|verify token|---');

            Reserves.findAll(req.pagination)
                .then((responseServer) => {

                    console.log('---|all reserves|---'); //retorna todos os reserves

                    const response = {

                        auth: true,
                        ...responseServer
                    };

                    res.send(response);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    next();
                });
        });


    router.route('/reserves/:userId')
        //GET - findAll reserves
        .get(Users.autorize([scopes['read-reserve-client']]), function (req, res, next) {

            let idUser = req.params['userId'];
            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];


            Reserves.findByUserId(idUser, pageNumber, nPerPage)
                .then((reserves) => {

                    console.log('---|all reserves|---'); //retorna todos os reserves
                    res.send(reserves);
                    next();
                })

                .catch((err) => {
                    console.log('---|error|---');
                    console.log(err);
                    next();
                });
        })


    router.route('/reserves/:reserveId')
        //PUT - update reserve by ID
        .put(Users.autorize([scopes['update-reserve']]), function (req, res, next) {

            let reserveId = req.params['reserveId'];
            let body = req.body;


            Reserves.update(reserveId, body)
                .then((room) => {
                    console.log('---|update one reserve by ID|---'); //altera dados do reserve
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
        .delete(Users.autorize([scopes['delete-reserve']]), function (req, res, next) {

            let reserveId = req.params['reserveId'];

            Reserves.removeById(reserveId)
                .then(() => {
                    console.log("---|delete one reserve by ID|---")
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



    //--------------------------------------------------------------------------------------//
    //------------------------------------ADMIN EDTIOR USER ROUTES-------------------------//
    //------------------------------------------------------------------------------------//

    router.route('/reserves/:roomId')
        //POST - create reserves
        .post(Users.autorize([scopes['create-reserve']]), function (req, res, next) {

            console.log('---|create reserve|---');

            let roomId = req.params['roomId'];
            let body = req.body;

            Reserves.create(body, roomId)
                .then((body) => {
                    console.log('---|funciona|---');

                    /* const response = { auth: true, ...responseServer };

                    res.send(response);
                    console.log("response create reserves: " + { ...responseServer });
                    next(); */
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


    router.route('/reserves/:reserveId')
        //GET - findById reserve
        .get(Users.autorize([scopes['detail-reserve']]), function (req, res, next) {

            let reserveId = req.params['reserveId'];


            Reserves.findById(reserveId)
                .then((reserve) => {
                    console.log('---|find one reserve by ID|---'); //retorna o reserve pelo Id
                    res.status(200);
                    res.send(reserve);
                    next();
                })


                .catch((err) => {
                    console.log('---|error|---');
                    res.status(404);
                    next();
                });
        });



    //------------------------------------------------------------------------------------//
    //------------------------------------USER ROUTES------------------------------------//
    //----------------------------------------------------------------------------------//


    router.route('/user/reserves/:idUser')
        //GET - findAll reserves
        .get(Users.autorize([scopes['read-own-reserves']]), function (req, res, next) {

            let idUser = req.params['idUser'];


            Reserves.findByUserId(idUser, req.pagination)
                .then((responseServer) => {
                    console.log('---|MY RESERVES|---'); //retorna o room pelo Id

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


    return router;

}

module.exports = ReserveRouter;