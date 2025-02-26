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

