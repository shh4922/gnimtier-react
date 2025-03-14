import {useMutation, useQuery} from "@tanstack/react-query";
import {getWithToken, postWithToken} from "@/api/http";
import {Summoner} from "@/api/user/model.tft";

export const useFetchRiotInfo = (userId:string|undefined|null) => {
    return useQuery({
        queryFn: () => getWithToken<{ summoners:Summoner }>(`users/${userId}/riot/summoners`),
        queryKey: ["riotInfo",userId],
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        retry:0,
        refetchOnWindowFocus: false, // 윈도우 탭 전환시, 다시 패치 false
        enabled: !!userId,
    })
}

/**
 * 소환사 조회
 * @param userId
 */
export const useFetchRiotAccount = (gameName:string, tagLine:string) => {
    const params = {
        gameName: gameName,
        tagLine: tagLine,
    }
    return useQuery({
        //
        queryFn: () => getWithToken<{summoner:Summoner}>(`riot/tft/summoners`,{
            params: params,
        }),
        queryKey: ["riotAccount",gameName,tagLine],
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        retry:0,
        refetchOnWindowFocus: false, // 윈도우 탭 전환시, 다시 패치 false
        enabled: false
    })
}

export const usePostRiotAccount = () => {
    return useMutation({
        mutationFn: (data: { puuid:string|undefined}) =>
            postWithToken("/users/riot/summoners",data)
    });
};
