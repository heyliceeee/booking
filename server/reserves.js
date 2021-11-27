const express = require('express');
const Reserves = require('../data/reserves');
const Rooms = require('../data/rooms');
const Users = require('../data/users');

function ReserveRouter(){

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

    router.route('/admin/reserves')
        //GET - findAll reserves
        .get(function (req, res, next){

            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];
            let role = "admin"


            if(!token){
                return res.status(401).send({ auth: false, message: 'No token provided.' })
            }

            return Users.verifyToken(token)
                .then((decoded) => {

                    console.log({ auth: true, decoded });

                    if(decoded.role != role){

                        console.log("---|unauthorized user|---");
                        res.status(500);
                        next();

                    } else {

                        Reserves.findAll()
                            .then((reserves) => {

                                console.log('---|ADMIN all reserves|---'); //retorna todos os reserves
                                res.send(reserves);
                                next();
                            })

                            .catch((err) => {
                                console.log('"---|ADMIN error|---"');
                                console.log(err);
                                next();
                            });
                    }
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    console.log(err);
                    next();
                });
        })

        
    router.route('/admin/reserves/:roomId')
        //POST - create reserves
        .post(function (req, res, next){

            console.log('---|ADMIN create reserve|---');

            let roomId = req.params['roomId'];
            let token = req.headers['x-access-token'];
            let body = req.body;
            let role = "admin";

            if(!token) {

                return res.status(401).send({ auth: false, message: 'No token provided.' })
            }


            return Users.verifyToken(token)
                .then((decoded) => {

                    console.log({ auth: true, decoded });

                    if(decoded.role != role){

                        console.log("---|unauthorized user|---");
                        res.status(500);
                        next();

                    } else {

                        return Rooms.findById(roomId)
                            .then(() => Reserves.create(body))

                            .then(() => {
                                console.log('save');
                                res.status(200);
                                res.send(body);
                                next();
                            })

                            .catch((err) => {
                                    console.log('"---|ADMIN error|---"');
                                    //console.log(err);
                                    err.status = err.status || 500;
                                    res.status(401);
                                    next();
                            });

                            
                    }
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    console.log(err);
                    next();
                });
            })    







































        return router;

}

module.exports = ReserveRouter;