const express = require('express');
var cors = require('cors')
    // var app = express()

const ZooFact = require("./zoo_functions");
const ApiFact = require("./api/zooApi");
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');

var exphbs = require('express-handlebars');
const pg = require('pg')
const Pool = pg.Pool;
const app = express();
app.use(cors())
// 'postgresql://loreen:pg123@localhost:5432/zoo_app';
const connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/zoo_app';
const pool = new Pool({
    connectionString
});

const zooFact = ZooFact(pool);
const zooApi = ApiFact(zooFact);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
    secret: "Please enter number!!",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.get('/addFlash', async function(req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});
app.get('/', function(req, res) {
    // req.flash('info', 'Welcome');
    res.render('index1')
});


app.post('/api/user', zooApi.storeUser)

app.get('/api/user/:name', zooApi.greetUser)


var portNumber = process.env.PORT || 3005;

//start everything up
app.listen(portNumber, function() {
    console.log('Starting Dancing Zoo on', portNumber);
});