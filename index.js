const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();


// Init middleware
// app.use(logger)

// Handle bars Middleware
app.engine('handlebars',exphbs.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars')

// Body Parser middle ware
app.use(express.json());

// Handle Url encoded data (form submissions)
app.use(express.urlencoded({extended: false}));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// Set static folder (wont render unless above homepage Route)
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});