const express = require('express');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//router.js
let router = require('./router');
var app = express();
app.use(router.initialize());
app.use(express.json())
//-----//

const server = http.Server(app);


//config.js e mongoose
let config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.db);


server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});