# Password Protected
Zero-config, lean Express middleware for password-protecting websites.

This is useful if you'd like to make any static website or express server password protected.

There are two other similar packages in NPM, but this one:
1. Works
2. Typescript
3. Better options, with strong defaults


## Examples: 
1. Basic: [examples/swagger](example/swagger)
1. With zeit now hosting: https://private-swagger.now.sh ([src](https://github.com/bdombro/private-swagger))


## Basic Usage
```javascript
import cookieParser from 'cookie-parser';
import express from 'express';
import shrinkRay from 'shrink-ray-current';
import passwordProtected from 'password-protected';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(shrinkRay());
app.use(passwordProtected({}));
app.use(express.static(__dirname + "/private")); // Serve files from the private folder
app.listen(3000, () => {
    console.info("Express is listening at http://localhost:3000");
});
```

## Options

All options are optional.

- pageTitle: The html title and h2 tag to display on the page
- password: Password for the website. Default = 'superpassword'
- jwtSecret: A secret to sign/secure tokens. Default = 'supersecret'
- hint: Display helpful text below the login form. Default is none.
- jwtData: Extra data to store in the token.
- loginHtml: Replace the default login page with whatever you want. The only requirement is that it has a form with input name='password'.