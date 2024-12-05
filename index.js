const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/secret', (req, res) => {
    res.send('Secret');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});