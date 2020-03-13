"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function passwordProtected({ pageTitle = 'Password Protected Page', password = 'superpassword', jwtSecret = 'supersecret', hint, jwtData = { name: "Unknown", role: "admin" }, loginHtml }) {
    return (req, res, next) => {
        if (req.method === 'POST' && req.body.password === password) {
            res.cookie('auth', jwt.sign({ data: jwtData }, jwtSecret, { expiresIn: 86400 }), { maxAge: 86400 });
            res.write("<script>window.location='/'</script>");
            res.end();
        }
        else {
            jwt.verify(req.cookies.auth, jwtSecret, (err, decoded) => {
                if (err) {
                    res.send(loginHtml !== null && loginHtml !== void 0 ? loginHtml : genLoginHtmlDefault(pageTitle, hint));
                    res.end();
                }
                else {
                    req.jwtData = decoded;
                    next();
                }
            });
        }
    };
}
exports.default = passwordProtected;
function genLoginHtmlDefault(pageTitle, hint) {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>${pageTitle}</h1>
        <form method="post">
            <label for="password">Password</label>
            <input name="password" type="password"/>
            <button>Submit</button>
        </form>
        <br/>
        <div style="max-width: 400px; background: #ccc; padding: 10px; border-radius: 4px">${hint}</div>
    </body>
</html>
`;
}
