import { get } from '@/api/http.ts'

export interface authResponse {
    access_token: string,
    refresh_token: string,
}


export function fetchTokenWithKakaoCode(code: string):Promise<{tokens: authResponse}> {
    const params= { code: code }
    return get<{tokens: authResponse}>("/auth/oauth/kakao",{ params:params })
}

export function fetchRefreshToken(headers:any): Promise<{tokens: authResponse}> {
    return get<{tokens: authResponse}>("/auth/refresh",{
        headers:headers,
    })
}
