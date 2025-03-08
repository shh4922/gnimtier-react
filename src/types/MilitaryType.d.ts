export type MilitaryType = 'army' | 'navy' | 'airForce' | 'marine';
export interface DivisionData {
    name: string;
    divisions: string[];
}
export interface MilitaryData {
    [key: string]: DivisionData;
}
