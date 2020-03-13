import * as jwt from "jsonwebtoken";

export interface passwordProtectedProps {
  password?: string,
  jwtSecret?: string,
  pageTitle: string,
  hint?: string,
  jwtData?: any,
  loginHtml?: string,
}

export default function passwordProtected(
  {
    password = 'superpassword',
    jwtSecret = 'supersecret',
    pageTitle = 'Password Protected Page',
    hint= "Hint: password is 'superpassword'",
    jwtData = {name: "Unknown", role: "admin"},
    loginHtml
  }: passwordProtectedProps
) {
  return (req: any, res: any, next: any) => {
    if (req.method === 'POST' && req.body.password === password) {
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
    </head>
    <body>
        <form method="post">
            <label for="password">Password</label>
            <input name="password" type="password"/>
            <button>Submit</button>
        </form>
        <br/>
        <div>${hint}</div>
    </body>
</html>
`;
}