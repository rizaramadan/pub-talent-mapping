export const STORAGE_KEY = "VeriftyOtpResponse";

export interface VeriftyOtpResponse {
    status: boolean;
    data: {
        accessToken: string;
        refreshToken: string;
        user: {
            signup: boolean;
            email: string;
            id: string;
            userId: string;
            fullName: string;
            picture: string | null;
        };
        circleProfile: {
            id: string | null;
            name: string | null;
            picture: string | null;
            banner: string | null;
        };
        roles: string[];
    };
}
