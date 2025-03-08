export interface authResponse {
    access_token: string;
    refresh_token: string;
}
export declare function fetchTokenWithKakaoCode(code: string): Promise<{
    tokens: authResponse;
}>;
export declare function fetchRefreshToken(headers: any): Promise<{
    tokens: authResponse;
}>;
