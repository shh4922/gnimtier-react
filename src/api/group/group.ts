import {get, getWithToken} from "@/api/http";
import {useQuery} from "@tanstack/react-query";

import {tftUserInfoResponse} from "@/api/user/model.tft";

interface Group {
    id: string;
    name: string;
    description: string;
    parentId: string;
    isRoot: boolean;
}
export interface GroupListResponse {
    groups: Group[];
}

export const useGroupList = () => {
    return useQuery({
        queryKey: ['groupList'],
        queryFn: () => getWithToken<GroupListResponse>("/users/groups"),
    });
};

export const useGroupsByGroupId = (groupId?: string, page=0) => {
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
