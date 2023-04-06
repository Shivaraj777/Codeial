//Description: This file contains the configuration for the kue module which is used to create a queue for the jobs

//importing the kue module
const kue = require('kue');

//creating a queue
const queue = kue.createQueue();

//exporting the queue
module.exports = queue;