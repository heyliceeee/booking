const express = require('express');
const Users = require('../data/users');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxce44548564ea43bfa2ae1e646dea13d2.mailgun.org';
const mg = mailgun({ apiKey: '1a7b89ba1d00ce38708846a9b3b293a9-7dcc6512-a5c50fc1', domain: DOMAIN });

function AuthRouter(){
    let router = express();

    //camadas
    router.use(express.json( {
        limit: '100mb' }
    ));

    router.use(express.urlencoded( 
       { limit: '100mb', extended: true }
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

    //auth/register        
    router.route('/admin/register')
        //POST - create user
        .post(function (req, res, next) {
            console.log('---|create user|---');
            
            const body = req.body;

            console.log(body);

            Users.create(body)
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    console.log(err);
                    next();
                });
        });


    //auth/admin/forgetpassword        
    //router.route('/admin/forgetpassword')
        //PUT - 
        /* .put(function (req, res, next) {
            console.log('---|ADMIN forget password|---');
            
            const email = req.body.email;

            Users.findEmail( { email } )

                /* .catch((err) => {
                    console.log('user with this email does not exists');
                    console.log(err);
                    res.status(400);
                    next();
                }) */

                /* .then((user) => Users.createTokenResetPassword(user))

                .then((rooms) => {
                    console.log('save');
                    res.send(rooms);
                    next();
                })

                .catch((err) => {
                    console.log('user with this email does not exists');
                    console.log(err);
                    res.status(400);
                    next();
                });
        }); */


    //auth/admin/resetpassword        
    router.route('/admin/resetpassword')
        //POST - 
        .post(function (req, res, next) {
            console.log('---|create user|---');
            
            const body = req.body;

            console.log(body);

            Users.create(body)
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    console.log(err);
                    next();
                });
        });    


    //auth/me
    router.route('/me')
        //GET - verify token
        .get(function(req, res, next) {
            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];

            if(!token) {

                return res.status(401).send({ auth: false, message: 'No token provided.' })
            }

            return Users.verifyToken(token)
                .then((decoded) => {

                    res.status(202).send({ auth: true, decoded });
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



    //auth/login
    router.route('/admin/login')
        //POST - validar se o user existe na BD
        .post(function (req, res, next) {
            console.log('---|verifiy user if exists|---');

            let name = req.body.name;
            let password = req.body.password;
            let role = req.body.role;


            Users.findUser({ name, password, role })
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })
            
                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    console.log(err);
                    next();
                });
        });


    router.route('/admin/users')
        //GET - verify token
        .get(function (req, res, next) {

            console.log('---|verify token|---');
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

                        Users.findAll()
                            .then((users) => {
                                console.log('---|ADMIN all users|---'); //retorna todos os rooms
                                res.send(users);
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
        });    


//-------------------------------------------------------------------------------------//
//------------------------------------EDITOR ROUTES------------------------------------//
//-----------------------------------------------------------------------------------//


    //auth/register        
    router.route('/editor/register')
        //POST - create user
        .post(function (req, res, next) {
            console.log('---|create user|---');

            const body = req.body;

            console.log(body);

            Users.create(body)
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    console.log(err);
                    next();
                });
        });



    //auth/me
    router.route('/me')
        //GET - verify token
        .get(function(req, res, next) {
            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];
            let role = user.role;

            if(!token) {

                return res.status(401).send({ auth: false, message: 'No token provided.' })
            }

            return Users.verifyToken(token)
                .then((decoded) => {

                    res.status(202).send( {role, auth: true, decoded });
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



    //auth/login
    router.route('/editor/login')
        //POST - validar se o user existe na BD
        .post(function (req, res, next) {
            console.log('---|verifiy user if exists|---');
            let name = req.body.name;
            let password = req.body.password;
            let role = req.body.role;


            Users.findUser({ name, password, role })
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })
            
                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });





//-------------------------------------------------------------------------------------//
//------------------------------------USER ROUTES------------------------------------//
//-----------------------------------------------------------------------------------//

    //auth/register        
    router.route('/user/register')
        //POST - create user
        .post(function (req, res, next) {
            console.log('---|create user|---');
            
            const body = req.body;

            console.log(body);

            Users.create(body)
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    console.log(err);
                    next();
                });
        });



    //auth/me
    router.route('/me')
        //GET - verify token
        .get(function(req, res, next) {
            console.log('---|verify token|---');
            let token = req.headers['x-access-token'];

            if(!token) {

                return res.status(401).send({ auth: false, message: 'No token provided.' })
            }

            return Users.verifyToken(token)
                .then((decoded) => {

                    res.status(202).send({ auth: true, decoded });
                })

                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



    //auth/login
    router.route('/user/login')
        //POST - validar se o user existe na BD
        .post(function (req, res, next) {
            console.log('---|verifiy user if exists|---');

            let name = req.body.name;
            let password = req.body.password;
            let role = req.body.role;
            

            Users.findUser({ name, password, role })
                .then((user) => Users.createToken(user))

                .then((response) => {
                    console.log('save');
                    res.status(200);
                    res.send(response);
                })
            
                .catch((err) => {
                    console.log("error");
                    res.status(500);
                    res.send(err);
                    next();
                });
        });



        return router;
}

module.exports = AuthRouter;