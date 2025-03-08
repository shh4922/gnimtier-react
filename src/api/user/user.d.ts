import { Me, Summoner, tftUserInfoResponse, User } from "@/api/user/model.tft";
/**
 * 그룹 리스트 조회
 * @param groupName
 * @param page
 */
export declare function fetchTftUserByGroup(groupId?: string): Promise<tftUserInfoResponse>;
/**
 * 내 카카오 정보 조회
 */
export declare function fetchMyInfo(): Promise<Me>;
/**
 * 내 Riot 정보 조회
 */
export declare function fetchMyRiotAccount(): Promise<Summoner>;
/**
 * riot 유저 정보 조회
 * puuid 얻기위해 사용
 * @param gameName
 * @param tagLine
 */
export declare function fetchTftSummonerInfo(gameName?: string, tagLine?: string): Promise<unknown>;
/**
 * 등록된 계정 체크
 * @param puuid
 */
export declare function checkRiotAccount(puuid: string): Promise<import("axios").AxiosResponse<any, any>>;
export declare const useFetchMyProfile: () => import("@tanstack/react-query").UseQueryResult<{
    user: User;
}, Error>;
export declare const useFetchUserProfile: (userId: string | undefined | null) => import("@tanstack/react-query").UseQueryResult<{
    user: User;
}, Error>;
