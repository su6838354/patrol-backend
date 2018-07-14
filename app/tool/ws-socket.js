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

setInterval(() => {
    if (sockets['admin']) {
        sockets['admin'].emit('init', message);
    }
}, 2000)

io.on('connection', (socket) => {
    numUsers++;

    let username = socket.handshake.query.username;
    if (username) {
        console.log('connect', username)
        if (username === 'admin') {
            socket.username = 'admin';
            sockets['admin'] = socket;
            socket.emit('init', message);
        } else {
            sockets[username] = socket;
            if (!message[username]) {
                message[username] = {
                    online: true,
                    msgs: []
                }
            }
            message[username].online = true;
        }

    }

    socket.on('admin connect', (data) => {
        // console.log('admin connect');
        // socket.username = 'admin';
        // sockets['admin'] = socket;
        // socket.emit('init', message);
    });

    // when the client emits 'new message', this listens and executes
    socket.on('send message from user', (data) => {
        // we tell the client to execute 'new message'
        try {
            console.log('send message from user', data);
            socket.username = data.username;

            message[data.username].msgs.push(data);

            const admin = sockets['admin'];
            if (admin) {
                admin.emit('send message from user to admin', data);
            } else {

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
            if (!message[data.username]) {
                message[data.username] = {
                    online: true,
                    msgs: []
                }
            }
            message[data.username].msgs.push(data);
        } catch (ex) {
            console.error(ex);
        }
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        try {
            numUsers--;
            console.log('disconnect', socket.username)
            if (socket.username !== 'admin') {
                message[socket.username].online = false;
            }
        } catch (ex) {
            console.log(ex);
        }
    });

});