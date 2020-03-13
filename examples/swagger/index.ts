const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
import passwordProtected from '../../src';
const shrinkRay = require('shrink-ray-current');
const repo = require('../../package.json').repository.url.slice(4);

const app = express();
app.use(cookieParser());
app.use(bodyParser());
app.use(shrinkRay());
app.use(passwordProtected({
    password: 'superpassword',
    jwtSecret: 'supersecret',
    hint: `Hint: password is 'superpassword'. Source code for this app is at <a target='_blank' href='${repo}'>${repo}</a>`,
}));
app.use(express.static(__dirname + "/private")); // include any other files dist directory
app.listen(3000, () => {
    console.info("Swagger is listening at http://localhost:3000");
});