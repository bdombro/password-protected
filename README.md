# Password Protected

Express password-protected middleware for drop-in private websites.

This is useful if you'd like to make any static website or express server password protected.

Examples: 
1. Basic: [examples/swagger](example/swagger)
1. With zeit now hosting: https://private-swagger.now.sh ([src](https://github.com/bdombro/private-swagger))

To use,

```javascript
const passwordProtected = require('password-protected');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const shrinkRay = require('shrink-ray-current');

const app = express();
app.use(cookieParser());
app.use(bodyParser());
app.use(shrinkRay());
app.use(passwordProtected({}));
app.use(express.static(__dirname + "/private")); // Serve files from the private folder
app.listen(3000, () => {
    console.info("Express is listening at http://localhost:3000");
});
```