import {get, getWithToken, postWithToken} from "@/api/http";
import {useMutation, useQuery} from "@tanstack/react-query";
import {tftUserInfoResponse} from "@/api/user/model.tft";

export interface Group {
    id: string;
    name: string;
    description: string;
    parentId: string;
    isOfficial: boolean;
    isJoinable: boolean;
}
export interface GroupListResponse {
    groups: Group[];
}

export const useFetchGroupList = (userId:string|undefined) => {
    return useQuery({
        queryKey: ['groupList'],
        queryFn: () => getWithToken<GroupListResponse>(`/users/${userId}/groups`),
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        enabled: !!userId
    });
};

export const useFetchGroupsUserByGroupId = (groupId?: string, page=0) => {
    const params = {
        "groupId": `${groupId}`,
        "sortBy": "tier",
        "page" : `${page}`
    }
    return useQuery({
        queryKey: ['groupUsers', groupId, page],
        queryFn: () => getWithToken<tftUserInfoResponse>('/riot/tft/leaderboard/by-group',{
            params: params
        }),
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        enabled: !!groupId, // groupId가 있을 때만 실행
    });
};

export const useFetchGroupByParentId = (parentId: string|null=null) => {

    const params = parentId ? {parentId: `${parentId}`} : undefined
    return useQuery({
        queryKey: ['parentGroup', parentId],
        queryFn: () => get<GroupListResponse>('/groups/by-parentId',{
            params: params
        }),


    });
}

export const useMutateJoinGroup = () => {
    // return postWithToken(`/groups/${groupId}`)
    return useMutation({
        mutationFn: (groupId:string) => postWithToken(`/groups/${groupId}`),
        onSuccess: (data) => {
            return data
        },
        onError: (err) => {}
    });
};

