class Tier {
    getTierName(tier: number): string {
        switch (tier) {
            case 10: return 'Iron';
            case 9: return 'Bronze';
            case 8: return 'Silver';
            case 7: return 'Gold';
            case 6: return 'Platinum';
            case 5: return 'Emerald';
            case 4: return 'Diamond';
            case 3: return 'Master';
            case 2: return 'Grandmaster';
            case 1: return 'Challenger';
            default: return 'Unknown Tier';
        }
    }

    getTierImage(tier: number): string {
        switch (tier) {
            case 10: return '/assets/tier/Iron.png';
            case 9: return '/assets/tier/bronze.png';
            case 8: return '/assets/tier/silver.png';
            case 7: return '/assets/tier/gold.png';
            case 6: return '/assets/tier/platinum.png';
            case 5: return '/assets/tier/emerald.png';
            case 4: return '/assets/tier/diamond.png';
            case 3: return '/assets/tier/master.png';
            case 2: return '/assets/tier/grandmaster.png';
            case 1: return '/assets/tier/challenger.png';
            default: return '/assets/bronze.png';
        }
    }
}

export default Tier;
