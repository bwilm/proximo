import axios from 'axios';
import {models} from '../models/models.d';

let googleMapsClient = require('@google/maps').createClient({
    key: `${process.env.GOOGLE_WEB_SERVICES_KEY}`,
    Promise: Promise
})


export function getCoords(query: any): Promise<any> {

    return googleMapsClient.geocode({
        address: query.address
    }).asPromise()
    .then((response: any) => {
        query.lat = response.json.results[0].geometry.location.lat;
        query.lng = response.json.results[0].geometry.location.lng;
        return hasCoords(query);
    })
    .catch((error: any) => {
        console.log(error);
    });

};

export function hasCoords(query: any): Promise<Array<any>> {

    let convertedKeywords = convert(query.keywords);
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+query.lat+","+query.lng+"&radius="+query.radius+"&type="+query.type+convertedKeywords+"&opennow=true&key="+process.env.GOOGLE_PLACES_KEY;

    return axios.get(url)
    .then(results => {
        return getArrayDetails(results.data.results.map((element: any) => {
            return element.place_id;
        }));
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

function getArrayDetails(places: Array<string>): Promise<any> {

    let promiseList = shuffle(places).slice(0, 9).map((element: string) => {
        return getPlaceDetails(element);
    });

    return Promise.all(promiseList)
    .then(values => {
        return values;
    })
}

function getPlaceDetails(placeId: string): Promise<any> {


    const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key="+process.env.GOOGLE_PLACES_KEY;

    return axios.get(url)
    .then(response => {
        let placeDetail = {
            place_id: response.data.result.place_id,
            name: response.data.result.name,
            url: response.data.result.url,
            website: response.data.result.website,
            address: response.data.result.formatted_address,
            lat: response.data.result.geometry.location.lat,
            lng: response.data.result.geometry.location.lng,
            rating: response.data.result.rating,
            photos: response.data.result.photos
        }
        return placeDetail;
    })
    .catch(error => {
        console.log(error);
    })
};

export function getImage(reference: string): Promise<any> {
    const url = "https://maps.googleapis.com/maps/api/place/photo?key="+process.env.GOOGLE_PLACES_KEY+"&maxheight=1600&photoreference="+reference

    return axios.get(url)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

function shuffle(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
