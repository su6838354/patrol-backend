/**
 * Created by pdd on 2018/7/7.
 */

// Setup basic express server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


let numUsers = 0;

const sockets = {

};

const message = {

};

io.on('connection', (socket) => {
    numUsers++;
    console.log(numUsers)

    socket.on('admin connect', (data) => {
        console.log('admin connect');
        socket.username = 'admin';
        sockets['admin'] = socket;
    });

    // when the client emits 'new message', this listens and executes
    socket.on('send message from user', (data) => {
        // we tell the client to execute 'new message'
        try {
            console.log('send message from user', data);
            socket.username = data.username;
            sockets[data.username] = socket;
            const admin = sockets['admin'];
            if (admin) {
                admin.emit('send message from user to admin', data);
            } else {
                if (!message[data.username]) {
                    message[data.username] = []
                }
                message[data.username].push(data);
            }
        } catch (ex) {
            console.error(ex);
        }

    });

    // when the client emits 'new message', this listens and executes
    socket.on('send message from admin', (data) => {
        // we tell the client to execute 'new message'
        console.log('send message from admin', data);
        try {
            sockets[data.username].emit('send message from admin to user', data);
        } catch (ex) {
            console.error(ex);
        }
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        numUsers--;
        sockets[socket.username] = null;
        console.log(numUsers)
    });

});