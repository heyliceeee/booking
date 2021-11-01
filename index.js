const express = require('express');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
let router = require();

var app = express();
const server = http.Server(app);



server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});