export declare namespace models {
    export interface ICoords {
        lat: number,
        lng: number
    }
    export interface IQuery {
        address: string,
        lat: number,
        lng: number,
        radius: string,
        type: string,
        keywords: Array<string>
    }
    export interface IDetail {
        place_id: string,
        name: string,
        url: string,
        website: string,
        address: string,
        lat: number,
        lng: number,
        rating: number,
        photos: Array<string>
    }
    export interface IImage {
        place_id: string,
        name: string,
        url: string,
        website: string,
        address: string,
        lat: number,
        lng: number,
        rating: number,
        photos: string
    }
}
