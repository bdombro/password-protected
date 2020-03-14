# Password Protected

Express password-protected middleware for drop-in private websites.

This is useful if you'd like to make any static website or express server password protected.

Examples: 
1. Basic: [examples/swagger](example/swagger)
1. With zeit now hosting: https://private-swagger.now.sh ([src](https://github.com/bdombro/private-swagger))

To use,

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