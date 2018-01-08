//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
//morgan is loging framwork and mostly use in debugging
app.use(morgan('combined'));
//bodyParser used to parse incoming request
app.use(bodyParser.json({ type: '*/*' }))

router(app)

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);