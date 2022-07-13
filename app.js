const express = require('express');
const app = express();
const feeds = require('feeds');

app.use('/feeds', feeds);

app.listen(3000);