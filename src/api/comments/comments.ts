import {useQuery} from "@tanstack/react-query";
import {getWithToken} from "@/api/http.ts";
import {User} from "@/api/user/model.tft.ts";


export interface CommnentsListResponse {
    data: Comment[];
    sortBy: string|null;
    pageSize: number;
    totalElements: number;
    hasNext : boolean;
    hasPrevious : boolean;
}

export interface Comment {
    author: User,
    comment: string,
    createdAt: string,
}

/**
 * 댓글리스트
 * @param gameName
 * @param tagLine
 */
export const useFetchCommentsByUserId = (userId : string|null|undefined) => {
    return useQuery({
        queryFn: () => getWithToken<CommnentsListResponse>(`users/${userId}/comments`),
        queryKey: ["comments",userId],
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        retry:0,
        refetchOnWindowFocus: false, // 윈도우 탭 전환시, 다시 패치 false
        enabled: !!userId
    })
}
