import { Summoner } from "@/api/user/model.tft";
export declare const useFetchRiotInfo: (userId: string | undefined | null) => import("@tanstack/react-query").UseQueryResult<{
    summoners: Summoner;
}, Error>;
/**
 * 소환사 조회
 * @param userId
 */
export declare const useFetchRiotAccount: (gameName: string, tagLine: string) => import("@tanstack/react-query").UseQueryResult<{
    summoner: Summoner;
}, Error>;
export declare const usePostRiotAccount: () => import("@tanstack/react-query").UseMutationResult<unknown, Error, {
    puuid: string | undefined;
}, unknown>;
