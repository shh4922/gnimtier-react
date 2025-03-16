import {deleteWithToken, get, getWithToken, postWithToken} from "@/api/http";
import {useMutation, useQuery} from "@tanstack/react-query";
import { tftUserInfoResponse} from "@/api/user/model.tft";


export interface Group {
    id: string;
    name: string;
    description: string;
    parentId: string;
    isOfficial: boolean;
    isJoinable: boolean;
    userCount: number;
    rank:number;
}

export interface PendingGroup {
    id: string;
    name: string;
    description:string
    voteCount: number
    createdAt :string
}


export interface PendingGroupResponse {
    groups: {
        data: PendingGroup[];
        sortBy: string|null;
        pageSize: number;
        totalPages: number;
        totalElements: number;
        hasNext : boolean;
        hasPrevious : boolean;
    }
}

export interface GroupListResponse {
    groups: Group[];
}

/**
 * userId가 속한 그룹을 보여줌.
 * 하지만 riotId를 인증하지않으면 400에러가 뜨는데, 이게 내가없을때인지, 해당유저가 인증안했을때인지를 잘 모르겠음
 * @param userId
 */
export const useFetchGroupList = (userId:string|undefined|null) => {
    return useQuery({
        queryKey: ['groupList', userId],
        queryFn: () => getWithToken<GroupListResponse>(`/users/${userId}/groups`),
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        enabled: !!userId
    });
};

export const useFetchGroupsUserByGroupId = (groupId?: string|null, page=0) => {

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

export const fetchGroupsUserByGroupId = (groupId:string|undefined|null, page=0) => {
    const params = {
        "groupId": `${groupId}`,
        "sortBy": "tier",
        "page" : `${page}`
    }
    return getWithToken<tftUserInfoResponse>('/riot/tft/leaderboard/by-group',{
        params: params
    })
}

/**
 * 투표중인 그룹
 * @param groupId
 * @param page
 */
export const useFetchPendingGroups = (page=0) => {
    const params = {
        "sortBy": "voteCount",
        "page" : `${page}`
    }
    return useQuery({
        queryKey: ['pendingGroup', page],
    queryFn: () => getWithToken<PendingGroupResponse>('/groups/pending', {
            params: params
        }),
        // gcTime: 1000 * 60 * 60, // 1시간동안 캐싱 한시간
        // staleTime: 1000 * 60 * 60, // 한시간에 한번 리패칭
        // enabled: !!groupId, // groupId가 있을 때만 실행
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
        onError: (err) => {
            return err
        }
    });
};

export const postJoinGroup = (groupId: string) => {
    return postWithToken(`/groups/${groupId}`)
}

export const voteGroup = (groupId: string) => {
    return postWithToken(`/groups/pending/${groupId}`)
}



export const leaveGroup = (groupId: string) => {
    return deleteWithToken(`/groups/${groupId}`)
}

