const express = require('express')
const basicAuth = require('basic-auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const authenticate = (req, res, next) => {
    const user = basicAuth(req);
    if (user && user.name == process.env.USERNAME && user.pass == process.env.PASSWORD) {
        return next();
    } else {
        res.set('WWW-Authenticate', 'Basic ream="example"');
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