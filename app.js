const express = require('express');
require('./config/dbConfig');
const apiRouter = require('./routes/apiroutes');

var app = express();

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", apiRouter);    

const PORT = 7000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));