const express = require('express');
const Users = require('../data/users');

function AuthRouter(){
    let router = express();

    //camadas
    router.use(express.json( {
        limit: '100mb' }
    ));

    router.use(express.urlencoded( 
       { limit: '100mb', extended: true }
    ));
    //fim camadas



//-------------------------------------------------------------------------------------//
//------------------------------------ADMIN ROUTES------------------------------------//
//-----------------------------------------------------------------------------------//    

    //auth/register        
    router.route('/admin/register')
        //POST - create user
        .post(function (req, res, next) {
            console.log('---|create user|---');

            role = "admin";

            const body = req.body;

            console.log(body);

            Users.create(body, role)
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

            role = "admin";

            //console.log(name);
            //console.log(password);

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
//------------------------------------EDITOR ROUTES------------------------------------//
//-----------------------------------------------------------------------------------//


    //auth/register        
    router.route('/editor/register')
        //POST - create user
        .post(function (req, res, next) {
            console.log('---|create user|---');

            role = "editor";

            const body = req.body;

            console.log(body);

            Users.create(body, role)
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
    router.route('/editor/login')
        //POST - validar se o user existe na BD
        .post(function (req, res, next) {
            console.log('---|verifiy user if exists|---');
            let name = req.body.name;
            let password = req.body.password;

            role = "editor";

            //console.log(name);
            //console.log(password);

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

            role = "admin";

            const body = req.body;

            console.log(body);

            Users.create(body, role)
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

            role = "user";

            //console.log(name);
            //console.log(password);

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