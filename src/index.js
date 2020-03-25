const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);


var listener = app.listen(3333, function () {
    console.log('Server started on port %d', listener.address().port);
 });