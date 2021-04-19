var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions');
var taskObj = require('../objects/taskObj');

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
    
    const {id = null} = req.body;

    let tasks = await functions.getDoc(db);

    const filterFx = val => {
        return val.id === id
    };

    const taskArrId = tasks.list.findIndex(filterFx);
    tasks.list.splice(taskArrId, 1)

    await functions.writeData(db, tasks);

    res.send({
        data:{
        tasks
        },
        oMessage: 'Success',
        oFlag: 1
    });
});

module.exports = dbContainer;
