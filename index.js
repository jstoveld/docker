const express = require('express');
const basicAuth = require('basic-auth');
const dotenv = require('dotenv');

dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const app = express();
const port = 3000;

const authenticate = (req, res, next) => {
    const user = basicAuth(req);
    console.log('Received User:', user);
    if (user && user.name === process.env.USERNAME && user.pass === process.env.PASSWORD) {
        console.log('Authentication successful');
        return next();
    } else {
        console.log('Authentication failed');
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Auth Required.');
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/secret', authenticate, (req, res) => {
    res.send('This secret is super secret.');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});