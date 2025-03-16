class Tier {
    getTierName(tier: number): string {
        switch (tier) {
            case 0: return '언랭크';
            case 1: return 'Iron';
            case 2: return 'Bronze';
            case 3: return 'Silver';
            case 4: return 'Gold';
            case 5: return 'Platinum';
            case 6: return 'Emerald';
            case 7: return 'Diamond';
            case 8: return 'Master';
            case 9: return 'Grandmaster';
            case 10: return 'Challenger';
            default: return 'Unknown Tier';
        }
    }

    getTierImage(tier: number): string {
        switch (tier) {
            case 0: return '/assets/tier/unrank.png';
            case 1: return '/assets/tier/Iron.png';
            case 2: return '/assets/tier/bronze.png';
            case 3: return '/assets/tier/silver.png';
            case 4: return '/assets/tier/gold.png';
            case 5: return '/assets/tier/platinum.png';
            case 6: return '/assets/tier/emerald.png';
            case 7: return '/assets/tier/diamond.png';
            case 8: return '/assets/tier/master.png';
            case 9: return '/assets/tier/grandmaster.png';
            case 10: return '/assets/tier/challenger.png';
            default: return '/assets/bronze.png';
        }
    }

    getRankToRoma(rank:number):string {
        switch (rank) {
            case 0 : return '';
            case 1: return 'I';
            case 2: return 'II';
            case 3: return 'III';
            case 4: return 'IV';
            default: return 'V';
        }
    }
}

export default Tier;
