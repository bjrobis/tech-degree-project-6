//require installed items
const express = require('express');
const {projects} = require('./data.json');

//setup express app
const app = express();

//setup static express
app.use('/static', express.static('public'));

//set the view engine to use pug
app.set('view engine', 'pug');


//ROUTES
//renders homepage
app.get('/', (req, res) => {
    res.render('index', {projects});  
});

//render about page
app.get('/about', (req, res) => {
    res.render('about');  
});

//render dynamic project routes
app.get('/projects/:id', (req, res) => {
    const {id} = projects;
    res.render('project', {id}, {projects});  
});

//404 Not Found Error
app.use((req, est, next) => {
    const err = new Error('The Page You Were Looking For Is Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
});

//3000 is the port number
app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
}); 