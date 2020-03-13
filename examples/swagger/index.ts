import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as shrinkRay from 'shrink-ray-current';
import passwordProtected from '../../src';
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