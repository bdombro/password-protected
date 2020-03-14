import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import shrinkRay from 'shrink-ray-current';
import passwordProtected from '../../lib';
const repo = require('../../package.json').repository.url.slice(4);

const app = express();
app.use(cookieParser());
app.use(bodyParser());
app.use(shrinkRay());
app.use(passwordProtected({
    hint: `Hint: password is 'superpassword'. Source code for this app is at <a target='_blank' href='${repo}'>${repo}</a>`,
}));
app.use(express.static(__dirname + "/private")); // include any other files dist directory
app.listen(3000, () => {
    console.info("Swagger is listening at http://localhost:3000");
});