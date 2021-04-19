var express = require('express');
var router = express.Router();

var functions = require('../firestore/functions');
var taskObj = require('../objects/taskObj');

/* GET users listing. */
const dbContainer = (db) => router.post('/', async function(req, res, next) {
    
    const {id = null, title, description, categories, status, taskgroup} = req.body;

    let tasks = await functions.getDoc(db);

    if (!tasks) {
        tasks = {
            list: []
        }
    }

    const listLen = tasks.list.length;
    let task;

    if (listLen > 0) {
        const lastId = tasks.list[listLen - 1].id;
        task = taskObj(id === null ?  lastId + 1 : id, title, description,categories, status, taskgroup)
    } else {
        task = taskObj(0, title, description,categories, status, taskgroup)
    }
    

    if (id === null) {
        tasks.list.push(task);
    } else {
        
        const filterFx = val => {
            return val.id === id
        };

        const taskArrId = tasks.list.findIndex(filterFx);
        tasks.list.splice(taskArrId, 1, task)
    }

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
