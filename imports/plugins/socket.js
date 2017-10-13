/*
 * @file: socket.js
 * @description: Socket.io configuration 
 * @date: 09.10.2017
 * @author: Lancy Goyal
 * */

import { WebApp } from 'meteor/webapp';
import socket_io from 'socket.io';
import authentication from '../utils/authentication';

const io = socket_io(WebApp.httpServer);

let users = {},
    sockets = {};

export const registerSocket = () => {

    io.on('connect', (socket) => {

        let socket_id = socket.id;

        // console.log('new socket connected');

        socket.on('authenticate', (query, callback) => {

            let user_id = query['x-user-id'],
                token = query['x-login-token'];

            // let auth = authentication(user_id, token);

            // if(auth.authorise)

            // console.log(user_id, token, users);

            sockets[socket_id] = { user_id };
            users[user_id] = { socket_id };

            callback(null, 'authorised');

        });

        socket.on('hello', () => {

            if (sockets[socket_id]) {

                handleSocketActions({ type: "TEST", user_id: sockets[socket_id].user_id });

            } else {
                socket.disconnect('unauthorized');
            }

        });

        socket.on('disconnect', () => {
            if (sockets[socket_id]) {
                delete users[sockets[socket_id].user_id];
                delete sockets[socket_id];
            }
        });

        // socket.join('app', () => {
        //     let rooms = Object.keys(socket.rooms);
        //     console.log(rooms, users, sockets);
        //     socket.to('app').emit('rooms', { some: 'data' }); // broadcast to everyone in the room
        // });

        // // to one room
        // socket.to('others').emit('an event', { some: 'data' });
        // // to multiple rooms
        // socket.to('room1').to('room2').emit('hello');
        // // a private message to another socket
        // socket.to( /* another socket id */ ).emit('hey');
        // // sending to all clients in 'game' room, including sender
        // io.in('game').emit('big-announcement', 'the game will start soon');
        // // sending with acknowledgement
        // socket.emit('question', 'do you think so?', function (answer) {});

    });

};

const testMessage = (user_id) => {

    if (users[user_id]) {

        io.to(users[user_id].socket_id).emit('testMessage', user_id);
    }

};

export const handleSocketActions = (action) => {

    console.log('handleSocketActions', action, users, sockets);

    switch (action.type) {
        case "TEST":
            {
                testMessage(action.user_id);
                break;
            }
    }

};