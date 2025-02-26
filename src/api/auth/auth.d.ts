export interface authResponse {
    access_token: string;
    refresh_token: string;
}
export declare function fetchTokenWithKakaoCode(code: string): Promise<authResponse>;
