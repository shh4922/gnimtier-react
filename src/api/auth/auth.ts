import { get } from '@/api/http.ts'

export interface authResponse {
    access_token: string,
    refresh_token: string,
}


export function fetchTokenWithKakaoCode(code: string):Promise<authResponse> {
    const params= { code: code }
    return get("/auth/oauth/kakao",{ params:params })
}
