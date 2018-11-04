const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// for heroku port // in local 80 default
const port = process.env.PORT || 80;

const app = express();

// Awesome Middleware Feature for extra security

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now} - ${req.method} - ${req.url}`;
    console.log(log);

    // Writting to file
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Unable to write into file")
        }
    })

    next();
})

// Maintenance Middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
// registring helper

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// registring Partials
hbs.registerPartials(__dirname + '/views/partials');
// Setting View Engine (hbs)
app.set('view engine', 'hbs');
// Loading static directory
app.use(express.static(__dirname + '/public'));
// Root route
app.get('/', (req, res) => {
    res.render('home.hbs', {
        theTitle: 'Home Page',
        theAuthor: 'Himel Rana'
    });
})

// About Route

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        theTitle: 'About Page',
    })
})


// Bad route
app.get('/bad', (req, res) => {
    res.send({
        status: 'error',
        code: '404',
        details: 'Not Found'
    })
});



// Starting web server [Configuring ports]

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});