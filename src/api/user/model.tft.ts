export interface User {
    nickname: string;
    profileImageUrl: string;
}

export interface SummonerEntry {
    tier: number;
    rank: number;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: null | boolean;
    freshBlood: boolean;
    hotStreak: boolean;
    leagueId: string;
    queueType: string;
}

export interface Summoner {
    puuid: string;
    gameName: string;
    tagLine: string;
    id: string;
    accountId: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
    entry: {
        RANKED_TFT: SummonerEntry;
    };
}

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
