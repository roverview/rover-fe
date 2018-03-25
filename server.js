'use strict'

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public/'));

app.get('*', (req, res) => {
    console.log('recieved request');
    res.sendFile ('index.html', { root: './public/'});

    console.log('file sent');
});

app.listen(PORT, () => {
    console.log(`currently listening on ${PORT}`);
});