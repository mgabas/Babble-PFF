const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');
const db = require('./db/db_connect');
var urlencodeParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

// DEF

const versionApi = '/api/v1';
const port = 8080;

// LISTENING

    app.listen(port, console.log('Listening on port : ' + port));