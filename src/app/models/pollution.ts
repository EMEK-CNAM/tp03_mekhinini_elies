export interface Pollution {
    id?: string;
    titre: string;
    type: string;
    description: string;
    dateObservation: string; // ISO yyyy-mm-dd
    lieu: string;
    latitude: number;
    longitude: number;
    photo?: string;
}
