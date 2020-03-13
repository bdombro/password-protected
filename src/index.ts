import jwt, {VerifyErrors} from "jsonwebtoken";

const loginHtmlDefault = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Swagger UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
    </head>
    <body>
        <form method="post">
            <label for="password">Password</label>
            <input name="password" type="password"/>
            <button>Submit</button>
        </form>
        <div><br/>For the password, see </div>
    </body>
</html>
`;

const jwtDataDefault = {name: "Unknown", role: "admin"};

export default (
  password: string,
  jwtSecret: string,
  loginHtml: string = loginHtmlDefault,
  jwtData: any = jwtDataDefault,
) =>
  (req: any, res: any, next: any) => {
    if (req.method === 'POST' && req.body.password === password) {
      res.cookie(
        'auth',
        jwt.sign({data: jwtData}, jwtSecret, {expiresIn: 86400}),
        {maxAge: 86400}
      );
      res.write("<script>window.location='/'</script>");
      res.end();
    } else {
      jwt.verify(req.cookies.auth, jwtSecret, (err: VerifyErrors, decoded: object) => {
        if (err) {
          res.send(loginHtml);
          res.end();
        } else {
          req.jwtData = decoded;
          next();
        }
      })
    }
  };