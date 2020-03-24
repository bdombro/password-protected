import * as jwt from "jsonwebtoken";
import crypto from 'crypto';

export interface passwordProtectedProps {
  pageTitle?: string,
  password?: string,
  jwtSecret?: string,
  hint?: string,
  jwtData?: any,
  loginHtmlTemplate?: (pageTitle?: string, hint?:string, passwordRejected?: boolean) => string,
}

export default function passwordProtected(
  {
    pageTitle = 'Password Protected Page',
    password = 'superpassword',
    jwtSecret = 'supersecret',
    hint = '',
    jwtData = {name: "Unknown", role: "admin"},
    loginHtmlTemplate,
  }: passwordProtectedProps
) {
  return (req: any, res: any, next: any) => {
    if (req.method === 'POST' && safeCompare(req.body.password, password)) {
      res.cookie(
        'auth',
        jwt.sign({data: jwtData}, jwtSecret as string, {expiresIn: 86400}),
        {maxAge: 86400}
      );
      res.write("<script>history.back()</script>");
      res.end();
    } else {
      jwt.verify(req.cookies.auth, jwtSecret as string, (err: jwt.VerifyErrors, decoded: object) => {
        if (err) {
          res.send(loginHtmlTemplate
            ? loginHtmlTemplate(pageTitle, hint, req.method === 'POST')
            : loginHtmlTemplateDefault(pageTitle, hint, req.method === 'POST')
          );
          res.end();
        } else {
          req.jwtData = decoded;
          next();
        }
      })
    }
  };
}

function safeCompare (password1: string, password2: string) {
  return crypto.timingSafeEqual(
    Buffer.from(padString(password1)),
    Buffer.from(padString(password2)),
  )
}
function padString (password: string) {
  return (password + 'X'.repeat(20)).slice(0,20);
}

function loginHtmlTemplateDefault (pageTitle: string, hint: string, passwordRejected: boolean = false) {
  return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <style>
            input,p,button {font-size: 16px; line-height: 22px;}
        </style>
    </head>
    <body>
        <h1>${pageTitle}</h1>
        <form method="post">
            <input id="password" name="password" type="password" placeholder="Enter password" autofocus="autofocus"/>
            <button>Submit</button>
            ${passwordRejected ? `
                <div style="color: darkred; padding: 5px 0px 5px">Incorrect Password</div>
            ` : ''}
        </form>
        <p style="max-width: 300px; background: #ccc; padding: 10px; border-radius: 4px">${hint}</p>
        
        <script>
            var input = document.getElementById('password');
            input.focus();
            input.select();
        </script>
    </body>
</html>
`;
}