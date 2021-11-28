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
            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];


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

                        Reserves.findAll(pageNumber, nPerPage)
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

    
    router.route('/admin/reserves/:userId')
        //GET - findAll reserves
        .get(function (req, res, next){

            console.log('---|verify token|---');
            let idUser = req.params['userId'];
            let token = req.headers['x-access-token'];
            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];
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

                        Reserves.findByUserId(idUser, pageNumber, nPerPage)
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


        router.route('/admin/reserves/:reserveId')    
            //PUT - update reserve by ID
            .put(function (req, res, next) {

            role = "admin";
            let reserveId = req.params['reserveId'];
            let body = req.body;
            let token = req.headers['x-access-token'];


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

                        Reserves.update(reserveId, body)
                            .then((room) => {
                                console.log('---|admin update one reserve by ID|---'); //altera dados do reserve
                                res.status(200);
                                res.send(room);
                                next();
                        })

                        .catch((err) => {
                            console.log('"---|admin error|---"');
                            res.status(404);
                            next();
                        });
                    }
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
            })

        //DELETE - delete room by ID
        .delete(function (req, res, next) {

            let role = "admin";
            let reserveId = req.params['reserveId'];
            let token = req.headers['x-access-token'];


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

                        Reserves.removeById(reserveId)
                            .then(() => {
                                console.log("---|ADMIN delete one reserve by ID|---")
                                res.status(200);
                                res.send("delete successfully");
                                next();
                            })

                            .catch((err) => {
                                console.log('"---|ADMIN error|---"');
                                res.status(404);
                                next();
                            });
                    }                       
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



//--------------------------------------------------------------------------------------//
//------------------------------------EDTIOR ROUTES------------------------------------//
//------------------------------------------------------------------------------------//


    router.route('/editor/reserves')
        //GET - findAll reserves
        .get(function (req, res, next){

            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];
            let role = "editor"
            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];


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

                        Reserves.findAll(pageNumber, nPerPage)
                            .then((reserves) => {

                                console.log('---|EDITOR all reserves|---'); //retorna todos os reserves
                                res.send(reserves);
                                next();
                            })

                            .catch((err) => {
                                console.log('"---|EDITOR error|---"');
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


    router.route('/editor/reserves/:roomId')
        //POST - create reserves
        .post(function (req, res, next){

            console.log('---|EDITOR create reserve|---');

            let roomId = req.params['roomId'];
            let token = req.headers['x-access-token'];
            let body = req.body;
            let role = "editor";

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
                                    console.log('"---|EDITOR error|---"');
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


    router.route('/editor/reserves/:reserveId')    
        //GET - findById reserve
        .get(function (req, res, next) {

            let reserveId = req.params['reserveId'];
            let token = req.headers['x-access-token'];
            let role = "editor";


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
                        Reserves.findById(reserveId)
                            .then((reserve) => {
                                console.log('---|EDITOR find one reserve by ID|---'); //retorna o reserve pelo Id
                                res.status(200);
                                res.send(reserve);
                                next();
                            })


                            .catch((err) => {
                                console.log('"---|EDITOR error|---"');
                                res.status(404);
                                next();
                            });
                    }
                })
                
                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        })

        //PUT - update reserve by ID
        .put(function (req, res, next) {

            role = "editor";
            let reserveId = req.params['reserveId'];
            let body = req.body;
            let token = req.headers['x-access-token'];


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

                        Reserves.update(reserveId, body)
                            .then((room) => {
                                console.log('---|EDITOR update one reserve by ID|---'); //altera dados do reserve
                                res.status(200);
                                res.send(room);
                                next();
                        })

                        .catch((err) => {
                            console.log('"---|EDITOR error|---"');
                            res.status(404);
                            next();
                        });
                    }
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        })

        //DELETE - delete room by ID
        .delete(function (req, res, next) {

            let role = "admin";
            let reserveId = req.params['reserveId'];
            let token = req.headers['x-access-token'];


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

                        Reserves.removeById(reserveId)
                            .then(() => {
                                console.log("---|ADMIN delete one reserve by ID|---")
                                res.status(200);
                                res.send("delete successfully");
                                next();
                            })

                            .catch((err) => {
                                console.log('"---|ADMIN error|---"');
                                res.status(404);
                                next();
                            });
                    }                       
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



//------------------------------------------------------------------------------------//
//------------------------------------USER ROUTES------------------------------------//
//----------------------------------------------------------------------------------//


    router.route('/user/reserves/:userId')
        //GET - findAll reserves
        .get(function (req, res, next){

            console.log('---|verify token|---');
            let idUser = req.params['userId'];
            let token = req.headers['x-access-token'];
            let pageNumber = req.headers['page'];
            let nPerPage = req.headers['limit'];
            let role = "user"


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

                        Reserves.findByUserId(idUser, pageNumber, nPerPage)
                            .then((reserves) => {

                                console.log('---|USER all reserves|---'); //retorna todos os reserves
                                res.send(reserves);
                                next();
                            })

                            .catch((err) => {
                                console.log('"---|USER error|---"');
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


    router.route('/user/reserves/:roomId')
        //POST - create reserves
        .post(function (req, res, next){

            console.log('---|USER create reserve|---');

            let roomId = req.params['roomId'];
            let token = req.headers['x-access-token'];
            let body = req.body;
            let role = "user";

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
                                    console.log('"---|USER error|---"');
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


    router.route('/user/reserves/:reserveId')    
        //PUT - update reserve by ID
        .put(function (req, res, next) {

            let role = "user";
            let reserveId = req.params['reserveId'];
            let body = req.body;
            let token = req.headers['x-access-token'];


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

                        Reserves.update(reserveId, body)
                            .then((room) => {
                                console.log('---|USER update one reserve by ID|---'); //altera dados do reserve
                                res.status(200);
                                res.send(room);
                                next();
                        })

                        .catch((err) => {
                            console.log('"---|USER error|---"');
                            res.status(404);
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



        return router;

}

module.exports = ReserveRouter;