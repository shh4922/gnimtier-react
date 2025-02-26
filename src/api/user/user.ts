import {getWithToken, postWithToken} from "@/api/http";
import {Summoner, User} from "@/api/user/model.tft";
import axios from "axios";

export interface tftUserInfoResponse {
    data: tftUserInfo[];
    sortBy: string|null;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    hasNext : boolean;
    hasPrevious : boolean;
}

export interface tftUserInfo {
    user: User;
    summoner: Summoner;
}

export interface groupResponse {
    id: string;
    name: string;
    description: string;
    parentId: string;
    isRoot: boolean;
}

/**
 * 그룹 리스트 조회
 * @param groupName
 * @param page
 */
export function fetchTftUserByGroup(groupName:string = "string",page=1): Promise<tftUserInfoResponse> {
    const params = {
        "gameName": `${groupName}`,
        "groupId": `${page}`,
        "sortBy": "tier",
        "page" : 0
    }
    const res = getWithToken<tftUserInfoResponse>('/leaderboard/by-group',{
        params: params
    })
    return res
}

/**
 * 내 카카오 정보 조회
 */
export function fetchMyInfo():Promise<User> {
    try {
        const res = getWithToken<User>('users/me')
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
