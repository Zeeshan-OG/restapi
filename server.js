const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const proRoute = require('./route');
const PORT = Number(process.env.PORT || 3000);
const config = require('./config/db');

const app = express();

//body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//set global Promise
mongoose.Promise = global.Promise;

mongoose.connect(config.DB, {
    useNewUrlParser: true
}).then(
    res => {
        console.log('Database connected');
    },
    err => {
        assert.equal(null, err);
    }
);

// CORS => Cross origin Resource Sharing
app.use(cors());

// config the route
// http://localhost:3000/product/api
app.use('/', proRoute);

//port config
app.listen(PORT, () => {
    console.log(`Server is running is http://localhost:${PORT}`);
});