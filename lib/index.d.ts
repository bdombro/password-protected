export interface passwordProtectedProps {
    password?: string;
    jwtSecret?: string;
    pageTitle: string;
    hint?: string;
    jwtData?: any;
    loginHtml?: string;
}
export default function passwordProtected({ password, jwtSecret, pageTitle, hint, jwtData, loginHtml }: passwordProtectedProps): (req: any, res: any, next: any) => void;
