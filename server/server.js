/*
 * @file: server.js
 * @description: server configuration 
 * @date: 09.10.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';
import { registerSocket } from '/imports/plugins/socket';

Meteor.startup(() => {
    registerSocket();
});