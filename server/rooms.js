const express = require('express');
const Rooms = require('../data/rooms');
const Users = require('../data/users');

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

            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];
            let price = req.body.price;
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

                        Rooms.findAll()
                            .then((rooms) => {
                                console.log('---|ADMIN all rooms|---'); //retorna todos os rooms
                                res.send(rooms);
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
        
        //POST - create rooms
        .post(function (req, res, next) {

            console.log('---|ADMIN create room|---');

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
                    }
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });


        router.route('/admin/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {

                let roomId = req.params['roomId'];
                let token = req.headers['x-access-token'];
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
                        }
                    })
                    
                    .catch((err) => {
                        console.log("error");
                        res.status(500);
                        res.send(err);
                        next();
                    });
            })

            //PUT - update room by ID
            .put(function (req, res, next) {

                role = "admin";
                let roomId = req.params['roomId'];
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

                let roomId = req.params['roomId'];
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
                        }                       
                    })

                    .catch((err) => {
                        console.log("error");
                        res.status(500);
                        res.send(err);
                        next();
                    });
            });


            router.route('/admin/rooms/:roomId/tags')
                //GET - findById room return tags
                .get(function (req, res, next) {

                    let role = "admin";

                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
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
                            }                            
                        })

                        .catch((err) => {
                            console.log("error");
                            res.status(500);
                            res.send(err);
                            next();
                        });
                })


        router.route('/admin/rooms/:description')
            //GET - findByDescription room
            .get(function (req, res, next) {
    
                    let role = "admin";
    
                    let description = req.params['description'];
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

                                Rooms.findByDescription(description)
                                    .then((room) => {
                                        console.log('---|ADMIN find room by description|---'); //retorna o room pelo Id
                                        res.status(200);
                                        res.send(room);
                                        next();
                                    })
    
    
                                    .catch((err) => {
                                        console.log('---|ADMIN error|---');
                                        console.log(err);
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




//-------------------------------------------------------------------------------------//
//------------------------------------EDITOR ROUTES-----------------------------------//
//-----------------------------------------------------------------------------------//

router.route('/editor/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {

            let role = "editor";
           
            console.log('---|verify token|---');
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

                        Rooms.findAll()
                        .then((rooms) => {
                            console.log('---|EDITOR all rooms|---'); //retorna todos os rooms
                            res.send(rooms);
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
                    res.send(err);
                    next();
                });
        })
        
        //POST - create rooms
        .post(function (req, res, next) {

            let role = "editor";

            console.log('---|EDITOR create room|---');

            let token = req.headers['x-access-token'];
            let body = req.body;

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
                    }
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });


        router.route('/editor/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {

                let role = "editor";

                let roomId = req.params['roomId'];
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

                        Rooms.findById(roomId)
                            .then((room) => {
                                console.log('---|EDITOR find one room by ID|---'); //retorna o room pelo Id
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

            //PUT - update room by ID
            .put(function (req, res, next) {

                let role = "editor";

                let roomId = req.params['roomId'];
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
                    } 
                    })

                    .catch((err) => {
                        console.log("error");
                        res.status(500);
                        res.send(err);
                        next();
                    });
            })


            router.route('/editor/rooms/:roomId/tags')
                //GET - findById room return tags
                .get(function (req, res, next) {

                    let role = "editor";

                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
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
                    }

                            
                        })

                        .catch((err) => {
                            console.log("error");
                            res.status(500);
                            res.send(err);
                            next();
                        });
                })

            router.route('/editor/rooms/:description')
            //GET - findByDescription room
            .get(function (req, res, next) {
    
                    let role = "editor";
    
                    let description = req.params['description'];
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

                                Rooms.findByDescription(description)
                                    .then((room) => {
                                        console.log('---|EDITOR find room by description|---'); //retorna o room pelo Id
                                        res.status(200);
                                        res.send(room);
                                        next();
                                    })
    
    
                                    .catch((err) => {
                                        console.log('---|EDITOR error|---');
                                        console.log(err);
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




//-------------------------------------------------------------------------------------//
//------------------------------------USER ROUTES------------------------------------ //
//-----------------------------------------------------------------------------------//

router.route('/user/rooms')
        //GET - findAll rooms
        .get(function (req, res, next) {

            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];
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
                        Rooms.findAll()
                            .then((rooms) => {
                                console.log('---|USER all rooms|---'); //retorna todos os rooms
                                res.send(rooms);
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


        router.route('/user/rooms/:roomId')
            //GET - findById room
            .get(function (req, res, next) {

                let roomId = req.params['roomId'];
                let token = req.headers['x-access-token'];
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
                    }
                    })
                    
                    .catch((err) => {
                        console.log("error");
                        res.status(500);
                        res.send(err);
                        next();
                    });
            })

            //POST - booking - FAZER DEPOIS     
            .post(function (req, res, next) {

                let token = req.headers['x-access-token'];
                let body = req.body;
                let role = "user";
                let roomId = req.params['roomId'];


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

                          Rooms.findById(roomId)
                            .then((room) => {
                                console.log('---|USER booking|---');
                                res.status(200);
                                res.send(room);
                                console.log(body);
                                console.log(decoded.id);
                                console.log(decoded.name);
                                next();
                            })

                            .catch((err) => {
                                console.log('"---|USER error|---"');
                                console.log('room already exists');
                                err.status = err.status || 500;
                                res.status(401);
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


            router.route('/user/rooms/:roomId/tags')
                 //GET - findById room return tags - DA ERRO
                 .get(function (req, res, next) {

                    let role = "user";

                    let roomId = req.params['roomId'];
                    let tags = req.body.tags;
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
                            }                            
                        })

                        .catch((err) => {
                            console.log("error");
                            res.status(500);
                            res.send(err);
                            next();
                        });
                })



            router.route('/user/rooms/:description')
                //GET - findByDescription room
                .get(function (req, res, next) {
    
                    let role = "user";
    
                    let description = req.params['description'];
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

                                Rooms.findByDescription(description)
                                    .then((room) => {
                                        console.log('---|USER find room by description|---'); //retorna o room pelo Id
                                        res.status(200);
                                        res.send(room);
                                        next();
                                    })
    
    
                                    .catch((err) => {
                                        console.log('---|USER error|---');
                                        console.log(err);
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


//-------------------------------------------------------------------------------------//
//------------------------------------ALL ROUTES--------------------------------------//
//-----------------------------------------------------------------------------------//

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
                            res.send(tags);
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
    
    
                    Rooms.findByDescription(description)
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