const express = require('express');

function RoomRouter() {

    let router = express();

    router.use(express.json({ limit: '100mb' }));
    router.use(express.urlencoded({ limit: '100mb', extended: true }));


    //criar get e post para o path /rooms
    router.route('/rooms')
        //get
        .get(function (req, res) {
            console.log('get');
            res.send('get');
        })

        //post
        .post(function (req, res) {
            console.log('post');
            res.send('post');
        });


        //criar put para o path /hotel
        router.route('/hotel')
            .put(function (req, res) {
                console.log('put');
                res.send('put');
            });

    return router;
}

module.exports = RoomRouter;