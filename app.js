//require installed items
const express = require('express');
const {projects} = require('./data.json');
const server = require('server');

//setup express app
const app = express();

//setup static express
app.use('/static', express.static('public'));

//set the view engine to use pug
app.set('view engine', 'pug');

//use images
app.use('/images', express.static('images'));


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
    const url = req.url;
    const urlNumber = url.charAt(url.length-1);
    const id = parseFloat(urlNumber);
    const name = projects[id].project_name;
    const description = projects[id].description;
    const technologies = projects[id].technologies;
    const gitHub = projects[id].github_link;
    const images = projects[id].images_urls;
    const demo = projects[id].live_link;
    res.render('project', {id, name, description, technologies, gitHub, images, demo}); 
});

//404 Not Found Error
app.use((req, est, next) => {
    const err = new Error('The Page You Were Looking For Is Not Found');
    err.status = 404;
    console.log(err.status);
    console.log(err.message);
    next(err);
});

//error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(err.status);
    console.log(err.message);
    res.render('error', err);
});

//3000 is the port number
app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
}); 