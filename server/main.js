/*
 * @file: main.js
 * @description: Socket.io configuration 
 * @date: 09.10.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import http from 'http';
import socket_io from 'socket.io';

const PORT = 3000;

// Client-side config
WebAppInternals.addStaticJs(`
  window.socketPort = ${PORT};
`);

Meteor.startup(() => {

    const io = socket_io(WebApp.httpServer);

    let counter = 0;

    // New client
    io.on('connection', function(socket) {

        console.log('new socket client');

        socket.emit('counter', counter);

        // Counter update from client
        socket.on('counter', (value) => {
            console.log(`counter changed on client: ${value}`);
            if (counter !== value) {
                io.emit('counter', counter = value);
            }
        });

        socket.on('disconnect', function() {
            console.log('socket disconnect');
        });

    });

});