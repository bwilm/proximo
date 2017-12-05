import axios from 'axios';
import {models} from '../models/models.d';

let googleMapsClient = require('@google/maps').createClient({
    key: `${process.env.GOOGLE_WEB_SERVICES_KEY}`,
    Promise: Promise
})


export function getCoords(address: string): Promise<models.ICoords> {
    return googleMapsClient.geocode({
        address: address
    }).asPromise()
    .then((response: any) => {
        return response.json.results[0].geometry.location;
    })
    .catch((error: any) => {
        console.log(error);
    });
};

export function getPlaces(lat: number, lng: number, radius: string, type: string, keywords: Array<string>): Promise<Array<any>> {
    
    let convertedKeywords = convert(keywords);
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+lat+","+lng+"&radius="+radius+"&type="+type+convertedKeywords+"&opennow=true&key="+process.env.GOOGLE_PLACES_KEY;
    return axios.get(url)
    .then(results => {
        return results.data.results.map((element: any) => {
            return element.place_id;
        });
    })
    .catch(error => {
        console.log(error);
    })
}

function convert(keywords: Array<string>) {
    if (keywords.length > 0) {
        let gKeywords = "&keyword=";

        for (let i = 0; i < keywords.length; i++) {
            if (i === keywords.length - 1) {
                gKeywords += keywords[i];
            } else {
                gKeywords += `${keywords[i]},`
            }
        }

        return gKeywords;

    } else {
        return '';
    }
};

export function getPlaceDetails(placeId: string): Promise<any> {

    const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key="+process.env.GOOGLE_PLACES_KEY;

    return axios.get(url)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
};

export function getArrayDetails(places: Array<string>): Promise<any> {

        let promiseList = places.map(element => {
            return getPlaceDetails(element);
        });

        return Promise.all(promiseList)
        .then(values => {
            return values;
        })

}
