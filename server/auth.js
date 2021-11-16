const express = require('express');
const Users = require('../data/users')

function AuthRouter() {
    let router = express();

    router.use(express.json({ limit: '100mb' }));
    router.use(express.urlencoded({ limit: '100mb', extended: true }));

    router.route('/register')
        .get(function (req, res, next) {
            Users.findAll()
                .then((users) => {
                    console.log('---|all rooms|---'); //retorna todos os rooms
                    res.send(users);
                    next();
                })

                .catch((err) => {
                    console.log('"---|error|---"');
                    next();
                });
        })

        .post(function (req, res, next) {
            const body = req.body;
            
            Users.create(body)
                .then((user) => Users.createToken(user))
                .then((response) => {
                    res.status(200);
                    res.send(response);
                })
                .catch((err) => {
                    res.status(500);
                    res.send(err);
                    next();
                });
        });

    return router;
}

module.exports = AuthRouter