import {getWithToken} from "@/api/http";
import {Me, Summoner, tftUserInfoResponse, User} from "@/api/user/model.tft";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";


/**
 * 그룹 리스트 조회
 * @param groupName
 * @param page
 */
export function fetchTftUserByGroup(groupId:string = "string"): Promise<tftUserInfoResponse> {
    const params = {
        "groupId": `${groupId}`,
        "sortBy": "tier",
        "page" : 0
    }
    const res = getWithToken<tftUserInfoResponse>('/riot/tft/leaderboard/by-group',{
        params: params
    })
    return res
}

/**
 * 내 카카오 정보 조회
 */
export function fetchMyInfo():Promise<Me> {
    try {
        const res = getWithToken<Me>('users/me')
        return res
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * 내 Riot 정보 조회
 */
export function fetchMyRiotAccount():Promise<Summoner> {
    try {
        const res = getWithToken<Summoner>('users/riot/account')
        return res
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * riot 유저 정보 조회
 * puuid 얻기위해 사용
 * @param gameName
 * @param tagLine
 */
export function fetchTftSummonerInfo(gameName:string="나 잡아봐랑 끼힛", tagLine:string="kr1") {
    const params = {
        gameName: gameName,
        tagLine: tagLine
    }
    try {
        const res = getWithToken('riot/tft/summoners',{
            params: params
        })
        return res
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * 등록된 계정 체크
 * @param puuid
 */
export function checkRiotAccount(puuid:string) {
    const data = { puuid: puuid }
    const headers = {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJzdWIiOiJlMjA4NzJlMy02NWU1LTQ5MjgtYjI0Ni05MjgxZmQwNWExNWQiLCJpYXQiOjE3NDA0MDczMDAsImV4cCI6MTc0MDQwODIwMH0.HFaoUhERtpxBSYc4U-FLICT6AvO3xLVqBeLEFNmhOt4"
    }
    console.log("data",data)
    try {

        const res = axios.post(`${import.meta.env.VITE_BASEURL+import.meta.env.VITE_API_VERSION}/users/riot/account`,data,{
            headers: headers
        })
            // postWithToken('users/riot/account',data)
        return res
    } catch (error) {
        console.error(error)
        throw error
    }
}


export const useFetchMyProfile = () => {

    return useQuery({
        queryFn: () => getWithToken<{ user:User }>('users/me'),
        queryKey: ["me"],
        gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        // retry:2,
        refetchOnWindowFocus: false, // 윈도우 탭 전환시, 다시 패치 false

    })
}

export const useFetchUserProfile = (userId:string|undefined|null) => {

    return useQuery({
        queryFn: () => getWithToken<{ user:User }>(`/users/${userId}`),
        queryKey: ["userInfo",userId],
        gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        // retry:2,
        refetchOnWindowFocus: false, // 윈도우 탭 전환시, 다시 패치 false
        enabled: !!userId,
    })
}

// export const useFetchMyRiotInfo = () => {
//     return useQuery({
//         queryFn: () => getWithToken<{ summoner:Summoner }>('users/riot/account'),
//         queryKey: ["myRiotInfo"],
//         // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
//         // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
//         // retry:2,
//         refetchOnWindowFocus: false, // 윈도우 탭 전환시, 다시 패치 false
//     })
// }
