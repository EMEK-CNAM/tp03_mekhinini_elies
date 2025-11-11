export interface Pollution {
    id?: string;
    titre: string;
    lieu: string;
    date_observation: string; // ISO yyyy-mm-dd
    type_pollution: string;
    description: string;
    latitude: number;
    longitude: number;
    photo_url?: string;
}
