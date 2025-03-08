import { tftUserInfoResponse } from "@/api/user/model.tft";
export interface Group {
    id: string;
    name: string;
    description: string;
    parentId: string;
    isOfficial: boolean;
    isJoinable: boolean;
    userCount: number;
    rank: number;
}
export interface PendingGroup {
    id: string;
    name: string;
    description: string;
    voteCount: number;
    createdAt: string;
}
export interface PendingGroupResponse {
    groups: {
        data: PendingGroup[];
        sortBy: string | null;
        pageSize: number;
        totalPages: number;
        totalElements: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
}
export interface GroupListResponse {
    groups: Group[];
}
export declare const useFetchGroupList: (userId: string | undefined | null) => import("@tanstack/react-query").UseQueryResult<GroupListResponse, Error>;
export declare const useFetchGroupsUserByGroupId: (groupId?: string, page?: number) => import("@tanstack/react-query").UseQueryResult<tftUserInfoResponse, Error>;
/**
 * 투표중인 그룹
 * @param groupId
 * @param page
 */
export declare const useFetchPendingGroups: (page?: number) => import("@tanstack/react-query").UseQueryResult<PendingGroupResponse, Error>;
export declare const useFetchGroupByParentId: (parentId?: string | null) => import("@tanstack/react-query").UseQueryResult<GroupListResponse, Error>;
export declare const useMutateJoinGroup: () => import("@tanstack/react-query").UseMutationResult<unknown, Error, string, unknown>;
export declare const postJoinGroup: (groupId: string) => Promise<unknown>;
export declare const voteGroup: (groupId: string) => Promise<unknown>;
export declare const leaveGroup: (groupId: string) => Promise<unknown>;
