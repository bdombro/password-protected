import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

export interface passwordProtectedProps {
  pageTitle?: string,
  password?: string,
  jwtSecret?: string,
  hint?: string,
  jwtData?: any,
  loginHtml?: string,
}

export default function passwordProtected(
  {
    pageTitle = 'Password Protected Page',
    password = 'superpassword',
    jwtSecret = 'supersecret',
    hint,
    jwtData = {name: "Unknown", role: "admin"},
    loginHtml
  }: passwordProtectedProps
) {
  const hash = bcrypt.hashSync(password, salt);
  return (req: any, res: any, next: any) => {
    if (req.method === 'POST' && bcrypt.compareSync(req.body.password, hash)) {
      res.cookie(
        'auth',
        jwt.sign({data: jwtData}, jwtSecret as string, {expiresIn: 86400}),
        {maxAge: 86400}
      );
      res.write("<script>window.location='/'</script>");
      res.end();
    } else {
      jwt.verify(req.cookies.auth, jwtSecret as string, (err: jwt.VerifyErrors, decoded: object) => {
        if (err) {
          res.send(loginHtml ?? genLoginHtmlDefault(pageTitle, hint as string));
          res.end();
        } else {
          req.jwtData = decoded;
          next();
        }
      })
    }
  };
}

function genLoginHtmlDefault (pageTitle: string, hint: string) {
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
            <input name="password" type="password" placeholder="Enter password"/>
            <button>Submit</button>
        </form>
        <p style="max-width: 300px; background: #ccc; padding: 10px; border-radius: 4px">${hint}</p>
    </body>
</html>
`;
}