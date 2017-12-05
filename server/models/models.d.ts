export declare namespace models {
    export interface ICoords {
        lat: number,
        lng: number
    }
    export interface IQuery {
        address: string,
        radius: string
        type: string,
        keywords: Array<string>
    }
}