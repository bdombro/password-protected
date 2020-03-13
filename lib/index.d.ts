export interface passwordProtectedProps {
    pageTitle?: string;
    password?: string;
    jwtSecret?: string;
    hint?: string;
    jwtData?: any;
    loginHtml?: string;
}
export default function passwordProtected({ pageTitle, password, jwtSecret, hint, jwtData, loginHtml }: passwordProtectedProps): (req: any, res: any, next: any) => void;
