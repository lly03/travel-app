const path = require('path');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('./src/client'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('src/client/views/index.html'));
})

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
})