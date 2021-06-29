const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// TODO: configure cors
app.use(cors());

module.exports = app;
