const express = require('express');
const app = express();
const http = require('http');
const { ppid } = require('process');
const { isObject } = require('util');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

let port = 3000;
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket)=> {
    console.log('a user connected');
    socket.on('chat message', (msg) =>{
        io.emit('chat message', msg);
        //console.log('message' + msg);
    });
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
});

server.listen(3000, ()=>{
    console.log('...listening on port ', port);
});