const functions = require('firebase-functions');
const express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')({origin: true});
var createError = require('http-errors');
var path = require('path');

var appendTaskRouter = require('./routes/appendTask');
var deleteTaskRouter = require('./routes/deleteTask');
var getTasksRouter = require('./routes/getTasks');

var firebaseAdmin = require('./firestore');

const app = express();

var db = firebaseAdmin();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/',cors);
app.use('/api/append-task', appendTaskRouter(db));
app.use('/api/delete-task', deleteTaskRouter(db));
app.use('/api/get-tasks', getTasksRouter(db));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

exports.app = functions.https.onRequest(app)