var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions');
var taskObj = require('../objects/taskObj');

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {

    let tasks = await functions.getDoc(db);

    res.send({
        data:{
        tasks
        },
        oMessage: 'Success',
        oFlag: 1
    });
});

module.exports = dbContainer;
