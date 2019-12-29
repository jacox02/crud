const express = require('express');
const morgan = require('morgan');
const expshbs = require('express-handlebars');
const path = require('path');

//Initializations
const app = express();
//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', expshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', '.hbs')
//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//Gloval Variables
app.use((req, res, next) => {

    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Start the server
app.listen(app.get('port'), ()=> {
    console.log('Server on port', app.get('port'))
});
